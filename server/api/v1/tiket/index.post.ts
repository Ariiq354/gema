import { createTiketSchema } from "~~/server/modules/tiket/model";
import { TiketService } from "~~/server/modules/tiket/service";
import { readValidatedMultipart } from "~~/server/utils/multipart";

export default defineEventHandler(async (event) => {
  const payload = await readValidatedMultipart(event, createTiketSchema);

  return "check";
  const result = await TiketService.createTiket(payload);

  return result;
});
