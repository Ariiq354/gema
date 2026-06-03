import type { db } from "../database";
import { like } from "drizzle-orm";
import { tiketTable } from "../database/schema/tiket";

type Tx = Parameters<Parameters<typeof db.transaction>[0]>[0];

export async function generateNoTiket(tx: Tx) {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");

  const prefix = `GEMA-${year}${month}`;

  const result = await tx.$count(tiketTable, like(tiketTable.noTiket, `${prefix}%`));

  const runningNumber = result + 1;

  return `${prefix}-${String(runningNumber).padStart(6, "0")}`;
}
