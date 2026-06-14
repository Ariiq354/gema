import { TiketService } from "~~/server/modules/tiket/service";
import { authGuard } from "~~/server/utils/guard";

export default defineEventHandler(async (event) => {
  authGuard(event);
  const result = await TiketService.tiketPendingCount();

  return result;
});
