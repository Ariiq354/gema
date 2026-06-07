import { InstansiService } from "~~/server/modules/instansi/service";
import { authGuard } from "~~/server/utils/guard";
import { paginationSearchSchema } from "~~/server/utils/schema";

export default defineEventHandler(async (event) => {
  authGuard(event);
  const payload = await getValidatedQuerySafe(event, paginationSearchSchema);

  const result = await InstansiService.findAllInstansi(payload);

  return result;
});
