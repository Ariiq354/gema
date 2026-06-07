import { createInstansiSchema } from "~~/server/modules/instansi/model";
import { InstansiService } from "~~/server/modules/instansi/service";
import { authGuard } from "~~/server/utils/guard";
import { readValidatedBodySafe } from "~~/server/utils/validator";

export default defineEventHandler(async (event) => {
  authGuard(event);
  const payload = await readValidatedBodySafe(event, createInstansiSchema);

  const result = await InstansiService.createInstansi(payload);

  return result;
});
