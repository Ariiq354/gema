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
    catch (error) {
      await Promise.allSettled(
        lampiranKeys.map(key => deleteFile(key)),
      );

      throw error;
    }
  }

  static async findByNoTiket(noTiket: string) {
    const tiket = await TiketRepo.findByNoTiket(noTiket);

    if (!tiket) {
      throw createError({ statusCode: 404, message: "Tiket not found" });
    };

    return tiket;
  }
}
