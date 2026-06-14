import {
  date,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { createdUpdated } from "./common";
import { instansiTable } from "./instansi";

export const jenisEnum = pgEnum("jenis", ["masukan", "aspirasi"]);
export const statusEnum = pgEnum("status", ["pending", "proses", "selesai"]);

export const tiketTable = pgTable("tiket", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  noTiket: text().notNull(),
  jenis: jenisEnum().notNull(),
  judul: text().notNull(),
  isi: text().notNull(),
  idInstansi: integer().references(() => instansiTable.id, { onDelete: "set null" }),
  status: statusEnum().notNull(),
  ...createdUpdated,
});

export const tiketMasukanTable = pgTable("tiket_masukan", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  idTiket: integer().references(() => tiketTable.id, { onDelete: "cascade" }).notNull().unique(),
  tanggalKejadian: date({ mode: "string" }).notNull(),
  lokasiKejadian: text().notNull(),
  ...createdUpdated,
});

export const tiketAspirasiTable = pgTable("tiket_aspirasi", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  idTiket: integer().references(() => tiketTable.id, { onDelete: "cascade" }).notNull().unique(),
  identitasPelapor: text().notNull(),
  ...createdUpdated,
});

export const tiketResponseTable = pgTable("tiket_response", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  idTiket: integer().references(() => tiketTable.id, { onDelete: "cascade" }).notNull(),
  isiRespon: text().notNull(),
  dibuatOleh: text().notNull(),
  ...createdUpdated,
});

export const tiketStatusHistoryTable = pgTable("tiket_status_history", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  idTiket: integer().references(() => tiketTable.id, { onDelete: "cascade" }).notNull(),
  statusSebelumnya: statusEnum(),
  statusBaru: statusEnum().notNull(),
  catatan: text(),
  createdAt: timestamp({ withTimezone: true }).defaultNow(),
});
