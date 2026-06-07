import { TiketService } from "~~/server/modules/tiket/service";
import { authGuard } from "~~/server/utils/guard";
import { paginationSearchSchema } from "~~/server/utils/schema";

export default defineEventHandler(async (event) => {
  authGuard(event);
  const payload = await getValidatedQuerySafe(event, paginationSearchSchema);

  const result = await TiketService.findPermintaanInformasi(payload);

  return result;
});
