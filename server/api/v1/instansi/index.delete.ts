import { InstansiService } from "~~/server/modules/instansi/service";
import { authGuard } from "~~/server/utils/guard";
import { deleteSchema } from "~~/server/utils/schema";
import { readValidatedBodySafe } from "~~/server/utils/validator";

export default defineEventHandler(async (event) => {
  authGuard(event);
  const payload = await readValidatedBodySafe(event, deleteSchema);

  const result = await InstansiService.deleteInstansi(payload.ids);

  return result;
});
