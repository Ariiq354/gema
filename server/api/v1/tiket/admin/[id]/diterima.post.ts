import { createTiketDiterimaSchema } from "~~/server/modules/tiket/model";
import { TiketService } from "~~/server/modules/tiket/service";
import { authGuard } from "~~/server/utils/guard";
import { idParamsSchema } from "~~/server/utils/schema";
import { getValidatedRouterParamsSafe, readValidatedBodySafe } from "~~/server/utils/validator";

export default defineEventHandler(async (event) => {
  authGuard(event);
  const params = await getValidatedRouterParamsSafe(event, idParamsSchema);
  const payload = await readValidatedBodySafe(event, createTiketDiterimaSchema);

  const result = await TiketService.tiketDiterima(params.id, payload);

  return result;
});
