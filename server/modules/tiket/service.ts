import type { CreateTiketSchema } from "./model";
import { TiketRepo } from "./repo";

export abstract class TiketService {
  static async createTiket(payload: CreateTiketSchema) {
    const lampiranKeys = await Promise.all(
      payload.files.map(file =>
        uploadFile(
          "tiket",
          file.filename!,
          file.data,
          file.type!,
        ),
      ),
    );

    try {
      return await TiketRepo.create(payload, lampiranKeys);
    }
    catch (err) {
      await Promise.allSettled(
        lampiranKeys.map(key => deleteFile(key)),
      );

      console.error("createTiket failed:", err);

      throw createError({ statusCode: 500, statusMessage: "Gagal membuat tiket" });
    }
  }

  static async findByNoTiket(noTiket: string) {
    const tiket = await TiketRepo.findByNoTiket(noTiket);

    if (!tiket) {
      throw createError({ statusCode: 404, statusMessage: "Tiket tidak ditemukan" });
    };

    return tiket;
  }
}
