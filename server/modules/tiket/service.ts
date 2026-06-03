import type { CreateTiketSchema } from "./model";
import { TiketRepo } from "./repo";

export abstract class TiketService {
  static async createTiket(payload: CreateTiketSchema) {
    return TiketRepo.create(payload);
  }

  static async findByNoTiket(noTiket: string) {
    const tiket = await TiketRepo.findByNoTiket(noTiket);

    if (!tiket) {
      throw createError({ statusCode: 404, message: "Tiket not found" });
    };

    return tiket;
  }
}
