import { createTiketSchema } from "~~/server/modules/tiket/model";
import { TiketService } from "~~/server/modules/tiket/service";

export default defineEventHandler(async (event) => {
  const payload = await readValidatedMultipart(event, createTiketSchema);

  const result = await TiketService.createTiket(payload);

  return result;
});
