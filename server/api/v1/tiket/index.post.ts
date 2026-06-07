import { createTiketSchema } from "~~/server/modules/tiket/model";
import { TiketService } from "~~/server/modules/tiket/service";
import { readValidatedBodySafe } from "~~/server/utils/validator";

export default defineEventHandler(async (event) => {
  const payload = await readValidatedBodySafe(event, createTiketSchema);

  const result = await TiketService.createTiket(payload);

  return result;
});
