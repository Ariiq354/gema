import type { PaginationSearchSchema } from "~~/server/utils/schema";
import type { CreateTiketDiterimaSchema, CreateTiketResponseSchema, CreateTiketSchema } from "./model";
import { TiketRepo } from "./repo";

export abstract class TiketService {
  static async createTiket(payload: CreateTiketSchema) {
    return await TiketRepo.create(payload);
  }

  static async findByNoTiket(noTiket: string) {
    const tiket = await TiketRepo.findByNoTiket(noTiket);

    if (!tiket) {
      throw createError({ statusCode: 404, statusMessage: "Tiket tidak ditemukan" });
    };

    return tiket;
  }

  static async findPengaduan(query: PaginationSearchSchema) {
    return await TiketRepo.findAll(query, "pengaduan");
  }

  static async findAspirasi(query: PaginationSearchSchema) {
    return await TiketRepo.findAll(query, "aspirasi");
  }

  static async findPermintaanInformasi(query: PaginationSearchSchema) {
    return await TiketRepo.findAll(query, "permintaan_informasi");
  }

  static async tiketDiterima(idTiket: number, body: CreateTiketDiterimaSchema) {
    return await TiketRepo.tiketDiterima(idTiket, body);
  }

  static async tiketSelesai(idTiket: number, body: CreateTiketResponseSchema) {
    return await TiketRepo.tiketSelesai(idTiket, body);
  }
}
