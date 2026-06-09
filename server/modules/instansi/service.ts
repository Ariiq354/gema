import type { PaginationSearchSchema } from "~~/server/utils/schema";
import type { CreateInstansiSchema } from "./model";
import { InstansiRepo } from "./repo";

export abstract class InstansiService {
  static async createInstansi(payload: CreateInstansiSchema) {
    return await InstansiRepo.create(payload);
  }

  static async findAllInstansi(query: PaginationSearchSchema) {
    return await InstansiRepo.findAll(query);
  }

  static async findAllInstansiActive() {
    return await InstansiRepo.findAllActive();
  }

  static async updateInstansi(id: number, payload: CreateInstansiSchema) {
    const result = await InstansiRepo.update(id, payload);
    if (result.length === 0) {
      throw createError({
        statusCode: 404,
        data: {
          code: "INSTANSI_MISSING",
          message: "Instansi tidak ditemukan",
        },
      });
    }
  }

  static async deleteInstansi(ids: number[]) {
    const result = await InstansiRepo.delete(ids);
    if (result.length === 0) {
      throw createError({
        statusCode: 404,
        data: {
          code: "INSTANSI_MISSING",
          message: "Instansi tidak ditemukan",
        },
      });
    }
    return result;
  }
}
