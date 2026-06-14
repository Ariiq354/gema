import type { db } from "../database";
import crypto from "node:crypto";
import { eq } from "drizzle-orm";
import { tiketTable } from "../database/schema/tiket";

type Tx = Parameters<Parameters<typeof db.transaction>[0]>[0];

export async function generateNoTiket(tx: Tx) {
  while (true) {
    const noTiket = `GEMA-${crypto
      .randomUUID()
      .replace(/-/g, "")
      .slice(0, 8)
      .toUpperCase()}`;

    const existing = await tx.query.tiketTable.findFirst({
      where: eq(tiketTable.noTiket, noTiket),
      columns: {
        id: true,
      },
    });

    if (!existing) {
      return noTiket;
    }
  }
}
