import { createInstansiSchema } from "~~/server/modules/instansi/model";
import { InstansiService } from "~~/server/modules/instansi/service";
import { authGuard } from "~~/server/utils/guard";
import { idParamsSchema } from "~~/server/utils/schema";
import { getValidatedRouterParamsSafe, readValidatedBodySafe } from "~~/server/utils/validator";

export default defineEventHandler(async (event) => {
  authGuard(event);
  const params = await getValidatedRouterParamsSafe(event, idParamsSchema);
  const payload = await readValidatedBodySafe(event, createInstansiSchema);

  const result = await InstansiService.updateInstansi(params.id, payload);

  return result;
});
