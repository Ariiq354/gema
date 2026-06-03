import { getTiketSchema } from "~~/server/modules/tiket/model";
import { TiketService } from "~~/server/modules/tiket/service";

export default defineEventHandler(async (event) => {
  const payload = await getValidatedQuerySafe(event, getTiketSchema);

  const result = await TiketService.findByNoTiket(payload.noTiket);

  return result;
});
