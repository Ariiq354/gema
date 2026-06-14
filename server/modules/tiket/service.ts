import type { CreateTiketDiterimaSchema, CreateTiketResponseSchema, CreateTiketSchema, GetTiketRequestSchema } from "./model";
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
        lampiranKeys.map(({ key }) => deleteFile(key)),
      );

      throw error;
    }
  }

  static async findByNoTiket(noTiket: string) {
    const tiket = await TiketRepo.findByNoTiket(noTiket);

    if (!tiket) {
      throw createError({
        statusCode: 404,
        data: {
          code: "TIKET_MISSING",
          message: "Tiket tidak ditemukan",
        },
      });
    };

    return tiket;
  }

  static async findMasukan(query: GetTiketRequestSchema) {
    return await TiketRepo.findAll(query, "masukan");
  }

  static async findAspirasi(query: GetTiketRequestSchema) {
    return await TiketRepo.findAll(query, "aspirasi");
  }

  static async tiketDiterima(idTiket: number, body: CreateTiketDiterimaSchema) {
    return await TiketRepo.tiketDiterima(idTiket, body);
  }

  static async tiketSelesai(idTiket: number, body: CreateTiketResponseSchema) {
    return await TiketRepo.tiketSelesai(idTiket, body);
  }

  static async tiketCount() {
    return await TiketRepo.tiketCount();
  }

  static async tiketPendingCount() {
    return await TiketRepo.tiketPendingCount();
  }
}
