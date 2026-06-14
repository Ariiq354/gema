import { TiketService } from "~~/server/modules/tiket/service";

export default defineEventHandler(async () => {
  const result = await TiketService.tiketCount();

  return result;
});
