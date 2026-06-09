import { DashboardRepo } from "./repo";

export abstract class DashboardService {
  static async statCard() {
    return await DashboardRepo.statCard();
  }

  static async graph() {
    return await DashboardRepo.graph();
  }
}
