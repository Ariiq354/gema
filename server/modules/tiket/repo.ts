import type { CreateTiketSchema } from "./model";
import { eq } from "drizzle-orm";
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
        id: tiket.id,
        noTiket,
      };
    });
  };

  static async findByNoTiket(noTiket: string) {
    return db.query.tiketTable.findFirst({
      where: eq(tiketTable.noTiket, noTiket),
    });
  }
}
