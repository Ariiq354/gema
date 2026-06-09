import {
  eachMonthOfInterval,
  endOfDay,
  endOfMonth,
  endOfYear,
  format,
  startOfDay,
  startOfMonth,
  startOfYear,
} from "date-fns";
import { and, count, eq, gte, lte, sql } from "drizzle-orm";
import { db } from "~~/server/database";
import { tiketTable } from "~~/server/database/schema/tiket";

export abstract class DashboardRepo {
  static async statCard() {
    const todayStart = startOfDay(new Date());
    const todayEnd = endOfDay(new Date());

    const monthStart = startOfMonth(new Date());
    const monthEnd = endOfMonth(new Date());

    const [
      [tiketMasukHariIni],
      [tiketPending],
      [tiketSelesaiBulanIni],
    ] = await Promise.all([
      db
        .select({ total: count() })
        .from(tiketTable)
        .where(
          and(
            gte(tiketTable.createdAt, todayStart),
            lte(tiketTable.createdAt, todayEnd),
          ),
        ),

      db
        .select({ total: count() })
        .from(tiketTable)
        .where(eq(tiketTable.status, "pending")),

      db
        .select({ total: count() })
        .from(tiketTable)
        .where(
          and(
            eq(tiketTable.status, "selesai"),
            gte(tiketTable.updatedAt, monthStart),
            lte(tiketTable.updatedAt, monthEnd),
          ),
        ),
    ]);

    return {
      tiketMasukHariIni: tiketMasukHariIni ? tiketMasukHariIni.total : 0,
      tiketPending: tiketPending ? tiketPending.total : 0,
      tiketSelesaiBulanIni: tiketSelesaiBulanIni ? tiketSelesaiBulanIni.total : 0,
    };
  }

  static async graph() {
    const yearStart = startOfYear(new Date());
    const yearEnd = endOfYear(new Date());

    const rows = await db
      .select({
        month: sql<string>`TO_CHAR(${tiketTable.createdAt}, 'YYYY-MM')`,
        total: count(),
      })
      .from(tiketTable)
      .where(gte(tiketTable.createdAt, yearStart))
      .groupBy(
        sql`TO_CHAR(${tiketTable.createdAt}, 'YYYY-MM')`,
      );

    const months = eachMonthOfInterval({
      start: yearStart,
      end: yearEnd,
    });

    const map = new Map(
      rows.map(row => [row.month, Number(row.total)]),
    );

    return months.map((month) => {
      const key = format(month, "yyyy-MM");

      return {
        month: key,
        total: map.get(key) ?? 0,
      };
    });
  }
}
