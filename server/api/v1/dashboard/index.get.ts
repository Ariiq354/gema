import { DashboardService } from "~~/server/modules/dashboard/service";
import { authGuard } from "~~/server/utils/guard";

export default defineEventHandler(async (event) => {
  authGuard(event);
  const statCard = await DashboardService.statCard();
  const graph = await DashboardService.graph();

  return {
    statCard,
    graph,
  };
});
