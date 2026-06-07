import { InstansiService } from "~~/server/modules/instansi/service";
import { paginationSearchSchema } from "~~/server/utils/schema";

export default defineEventHandler(async (event) => {
  const payload = await getValidatedQuerySafe(event, paginationSearchSchema);

  const result = await InstansiService.findAllInstansiActive(payload);

  return result;
});
