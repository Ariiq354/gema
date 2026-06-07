import { createTiketResponseSchema } from "~~/server/modules/tiket/model";
import { TiketService } from "~~/server/modules/tiket/service";
import { authGuard } from "~~/server/utils/guard";
import { idParamsSchema } from "~~/server/utils/schema";
import { getValidatedRouterParamsSafe, readValidatedBodySafe } from "~~/server/utils/validator";

export default defineEventHandler(async (event) => {
  authGuard(event);
  const params = await getValidatedRouterParamsSafe(event, idParamsSchema);
  const payload = await readValidatedBodySafe(event, createTiketResponseSchema);

  const result = await TiketService.tiketSelesai(params.id, payload);

  return result;
});
