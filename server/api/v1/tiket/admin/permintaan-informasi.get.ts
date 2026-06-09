import { getTiketRequestSchema } from "~~/server/modules/tiket/model";
import { TiketService } from "~~/server/modules/tiket/service";
import { authGuard } from "~~/server/utils/guard";

export default defineEventHandler(async (event) => {
  authGuard(event);
  const payload = await getValidatedQuerySafe(event, getTiketRequestSchema);

  const result = await TiketService.findPermintaanInformasi(payload);

  return result;
});
