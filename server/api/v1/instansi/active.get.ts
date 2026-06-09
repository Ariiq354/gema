import { InstansiService } from "~~/server/modules/instansi/service";

export default defineEventHandler(async () => {
  const result = await InstansiService.findAllInstansiActive();

  return result;
});
