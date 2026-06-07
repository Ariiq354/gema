import { boolean, integer, pgTable, text } from "drizzle-orm/pg-core";
import { createdUpdated } from "./common";

export const instansiTable = pgTable("instansi", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  nama: text().notNull(),
  isActive: boolean().notNull().default(true),
  ...createdUpdated,
});
