import type { CreateTiketDiterimaSchema, CreateTiketResponseSchema, CreateTiketSchema, GetTiketRequestSchema } from "./model";
import { TiketRepo } from "./repo";

export abstract class TiketService {
  static async createTiket(payload: CreateTiketSchema) {
    return await TiketRepo.create(payload);
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

  static async findPengaduan(query: GetTiketRequestSchema) {
    return await TiketRepo.findAll(query, "pengaduan");
  }

  static async findAspirasi(query: GetTiketRequestSchema) {
    return await TiketRepo.findAll(query, "aspirasi");
  }

  static async findPermintaanInformasi(query: GetTiketRequestSchema) {
    return await TiketRepo.findAll(query, "permintaan_informasi");
  }

  static async tiketDiterima(idTiket: number, body: CreateTiketDiterimaSchema) {
    return await TiketRepo.tiketDiterima(idTiket, body);
  }

  static async tiketSelesai(idTiket: number, body: CreateTiketResponseSchema) {
    return await TiketRepo.tiketSelesai(idTiket, body);
  }
}
