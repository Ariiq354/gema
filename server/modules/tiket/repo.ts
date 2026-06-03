import type { CreateTiketSchema } from "./model";
import { desc, eq } from "drizzle-orm";
import { db } from "~~/server/database";
import { tiketAspirasi, tiketLampiranTable, tiketPengaduan, tiketPermintaanInformasi, tiketStatusHistoryTable, tiketTable } from "~~/server/database/schema/tiket";
import { getFileExtension } from "~~/server/utils/files";
import { generateNoTiket } from "~~/server/utils/generate";

export abstract class TiketRepo {
  static async create(payload: CreateTiketSchema, lampiranKeys?: string[]) {
    return db.transaction(async (tx) => {
      const noTiket = await generateNoTiket(tx);

      const [tiket] = await tx
        .insert(tiketTable)
        .values({
          noTiket,
          jenis: payload.jenis,
          judul: payload.judul,
          isi: payload.isi,
          status: "pending",
        })
        .returning({ id: tiketTable.id });

      if (!tiket) {
        throw new Error("Failed to create tiket");
      }

      switch (payload.jenis) {
        case "pengaduan":
          await tx.insert(tiketPengaduan).values({
            idTiket: tiket.id,
            tanggalKejadian: payload.tanggalKejadian,
            lokasiKejadian: payload.lokasiKejadian,
          });
          break;

        case "aspirasi":
          await tx.insert(tiketAspirasi).values({
            idTiket: tiket.id,
            asalPelapor: payload.asalPelapor,
          });
          break;

        case "permintaan_informasi":
          await tx.insert(tiketPermintaanInformasi).values({
            idTiket: tiket.id,
            asalPelapor: payload.asalPelapor,
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

      if (lampiranKeys && lampiranKeys.length) {
        if (lampiranKeys.length !== payload.files.length) {
          throw new Error("Lampiran tidak sesuai dengan jumlah file");
        };

        await tx.insert(tiketLampiranTable).values(
          lampiranKeys.map((key, index) => {
            const file = payload.files[index]!;

            return {
              idTiket: tiket.id,
              storedName: key,
              path: key,
              originalName: file.filename ?? "",
              mimeType: file.type ?? "",
              extension: file.filename ? getFileExtension(file.filename) : "",
              size: file.data.length,
            };
          }),
        );
      }

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
        status: tiketTable.status,
        tanggalDibuat: tiketTable.createdAt,
      })
      .from(tiketTable)
      .where(eq(tiketTable.noTiket, noTiket))
      .limit(1);

    const data = tiket[0];
    if (!data)
      return null;

    const [lampiran, statusHistory] = await Promise.all([
      db
        .select({
          storedName: tiketLampiranTable.storedName,
          path: tiketLampiranTable.path,
          originalName: tiketLampiranTable.originalName,
          mimeType: tiketLampiranTable.mimeType,
          extension: tiketLampiranTable.extension,
          size: tiketLampiranTable.size,
        })
        .from(tiketLampiranTable)
        .where(eq(tiketLampiranTable.idTiket, data.id)),

      db
        .select({
          statusSebelumnya: tiketStatusHistoryTable.statusSebelumnya,
          statusBaru: tiketStatusHistoryTable.statusBaru,
          catatan: tiketStatusHistoryTable.catatan,
          tanggal: tiketStatusHistoryTable.createdAt,
        })
        .from(tiketStatusHistoryTable)
        .where(eq(tiketStatusHistoryTable.idTiket, data.id))
        .orderBy(desc(tiketStatusHistoryTable.createdAt)),
    ]);

    return {
      ...data,
      lampiran,
      statusHistory,
    };
  }
}
