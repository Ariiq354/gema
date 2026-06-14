import type { SQL } from "drizzle-orm";
import type {
  CreateTiketDiterimaSchema,
  CreateTiketResponseSchema,
  CreateTiketSchema,
  FindAllResultMap,
  GetTiketRequestSchema,
  Jenis,
} from "./model";
import { and, count, desc, eq, ilike, or } from "drizzle-orm";
import { db } from "~~/server/database";
import { instansiTable } from "~~/server/database/schema/instansi";
import {
  tiketAspirasiTable,
  tiketMasukanTable,
  tiketResponseTable,
  tiketStatusHistoryTable,
  tiketTable,
} from "~~/server/database/schema/tiket";
import { generateNoTiket } from "~~/server/utils/generate";

export abstract class TiketRepo {
  static async create(payload: CreateTiketSchema) {
    return db.transaction(async (tx) => {
      const noTiket = await generateNoTiket(tx);

      const [tiket] = await tx
        .insert(tiketTable)
        .values({
          noTiket,
          jenis: payload.jenis,
          judul: payload.judul,
          isi: payload.isi,
          idInstansi: payload.idInstansi,
          status: "pending",
        })
        .returning({ id: tiketTable.id });

      if (!tiket) {
        throw new Error("Failed to create tiket");
      }

      switch (payload.jenis) {
        case "masukan":
          await tx.insert(tiketMasukanTable).values({
            idTiket: tiket.id,
            tanggalKejadian: payload.tanggalKejadian,
            lokasiKejadian: payload.lokasiKejadian,
          });
          break;

        case "aspirasi":
          await tx.insert(tiketAspirasiTable).values({
            idTiket: tiket.id,
            identitasPelapor: payload.identitasPelapor,
          });
          break;
      }

      await tx
        .insert(tiketStatusHistoryTable)
        .values({
          idTiket: tiket.id,
          statusBaru: "pending",
          catatan: "Tiket dibuat",
        });

      return {
        noTiket,
      };
    });
  };

  static async findByNoTiket(noTiket: string) {
    const tiket = await db
      .select({
        id: tiketTable.id,
        noTiket: tiketTable.noTiket,
        jenis: tiketTable.jenis,
        judul: tiketTable.judul,
        isi: tiketTable.isi,
        instansi: instansiTable.nama,
        status: tiketTable.status,
        tanggalDibuat: tiketTable.createdAt,
      })
      .from(tiketTable)
      .leftJoin(instansiTable, eq(tiketTable.idInstansi, instansiTable.id))
      .where(eq(tiketTable.noTiket, noTiket))
      .limit(1);

    const data = tiket[0];
    if (!data)
      return null;

    const statusHistory = await db
      .select({
        statusSebelumnya: tiketStatusHistoryTable.statusSebelumnya,
        statusBaru: tiketStatusHistoryTable.statusBaru,
        catatan: tiketStatusHistoryTable.catatan,
        tanggal: tiketStatusHistoryTable.createdAt,
      })
      .from(tiketStatusHistoryTable)
      .where(eq(tiketStatusHistoryTable.idTiket, data.id))
      .orderBy(desc(tiketStatusHistoryTable.createdAt));

    return {
      ...data,
      statusHistory,
    };
  }

  static async findAll<T extends Jenis>(
    query: GetTiketRequestSchema,
    jenis: T,
  ): Promise<{
    total: number;
    data: FindAllResultMap[T][];
  }> {
    const offset = (query.page - 1) * query.limit;

    let qb;
    switch (jenis) {
      case "masukan":
        qb = db.select({
          id: tiketTable.id,
          noTiket: tiketTable.noTiket,
          judul: tiketTable.judul,
          isi: tiketTable.isi,
          idInstansi: tiketTable.idInstansi,
          status: tiketTable.status,
          tanggalKejadian: tiketMasukanTable.tanggalKejadian,
          lokasiKejadian: tiketMasukanTable.lokasiKejadian,
        })
          .from(tiketMasukanTable)
          .innerJoin(tiketTable, eq(tiketMasukanTable.idTiket, tiketTable.id))
          .orderBy(desc(tiketMasukanTable.id));

        break;
      case "aspirasi":
        qb = db.select({
          id: tiketTable.id,
          noTiket: tiketTable.noTiket,
          judul: tiketTable.judul,
          isi: tiketTable.isi,
          idInstansi: tiketTable.idInstansi,
          status: tiketTable.status,
          identitasPelapor: tiketAspirasiTable.identitasPelapor,
        })
          .from(tiketAspirasiTable)
          .innerJoin(tiketTable, eq(tiketAspirasiTable.idTiket, tiketTable.id))
          .orderBy(desc(tiketAspirasiTable.id));
        break;
    }

    const conditions: (SQL<unknown> | undefined)[] = [];

    if (query.search) {
      const searchCondition = `%${query.search}%`;
      conditions.push(
        or(
          ilike(tiketTable.noTiket, searchCondition),
          ilike(tiketTable.judul, searchCondition),
          ilike(tiketTable.isi, searchCondition),
        ),
      );
    }

    if (query.idInstansi) {
      conditions.push(eq(tiketTable.idInstansi, query.idInstansi));
    }

    if (query.status) {
      conditions.push(eq(tiketTable.status, query.status));
    }

    qb.where(and(...conditions));

    const total = await db.$count(qb);
    const data = await qb.limit(query.limit).offset(offset);

    return { total, data: data as FindAllResultMap[T][] };
  }

  static async tiketDiterima(idTiket: number, body: CreateTiketDiterimaSchema) {
    await db.transaction(async (tx) => {
      await tx.update(tiketTable).set({ status: "proses" }).where(eq(tiketTable.id, idTiket));

      await tx.insert(tiketStatusHistoryTable).values({
        idTiket,
        statusSebelumnya: "pending",
        statusBaru: "proses",
        catatan: body.catatan,
      });
    });
  }

  static async tiketSelesai(idTiket: number, body: CreateTiketResponseSchema) {
    await db.transaction(async (tx) => {
      await tx.update(tiketTable).set({ status: "selesai" }).where(eq(tiketTable.id, idTiket));

      await tx.insert(tiketStatusHistoryTable).values({
        idTiket,
        statusSebelumnya: "proses",
        statusBaru: "selesai",
        catatan: body.isiRespon,
      });

      await tx.insert(tiketResponseTable).values({
        idTiket,
        isiRespon: body.isiRespon,
        dibuatOleh: body.dibuatOleh,
      });
    });
  }

  static async tiketCount() {
    return db.$count(tiketTable);
  }

  static async tiketPendingCount() {
    const result = await db
      .select({
        jenis: tiketTable.jenis,
        total: count(),
      })
      .from(tiketTable)
      .where(eq(tiketTable.status, "pending"))
      .groupBy(tiketTable.jenis);

    return {
      aspirasi: result.find(item => item.jenis === "aspirasi")?.total ?? 0,
      masukan: result.find(item => item.jenis === "masukan")?.total ?? 0,
    };
  }
}
