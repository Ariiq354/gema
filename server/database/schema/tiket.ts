import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { createdUpdated } from "./common";

export const jenisEnum = pgEnum("jenis", ["pengaduan", "aspirasi", "permintaan_informasi"]);
export const statusEnum = pgEnum("status", ["pending", "proses", "selesai"]);

export const tiketTable = pgTable("tiket", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  noTiket: text().notNull(),
  jenis: jenisEnum().notNull(),
  judul: text().notNull(),
  isi: text().notNull(),
  status: statusEnum().notNull(),
  ...createdUpdated,
});

export const tiketPengaduan = pgTable("tiket_pengaduan", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  idTiket: integer().references(() => tiketTable.id, { onDelete: "cascade" }).notNull().unique(),
  tanggalKejadian: timestamp({ withTimezone: true }).notNull(),
  lokasiKejadian: text().notNull(),
  ...createdUpdated,
});

export const tiketAspirasi = pgTable("tiket_aspirasi", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  idTiket: integer().references(() => tiketTable.id, { onDelete: "cascade" }).notNull().unique(),
  asalPelapor: text().notNull(),
  ...createdUpdated,
});

export const tiketPermintaanInformasi = pgTable("tiket_permintaan_informasi", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  idTiket: integer().references(() => tiketTable.id, { onDelete: "cascade" }).notNull().unique(),
  asalPelapor: text().notNull(),
  ...createdUpdated,
});

export const tiketLampiranTable = pgTable("tiket_lampiran", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  idTiket: integer().references(() => tiketTable.id, { onDelete: "cascade" }).notNull(),
  storedName: text().notNull(),
  path: text().notNull(),
  originalName: text().notNull(),
  mimeType: text().notNull(),
  extension: text().notNull(),
  size: integer().notNull(),
  ...createdUpdated,
});

export const tiketResponseTable = pgTable("tiket_response", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  idTiket: integer().references(() => tiketTable.id, { onDelete: "cascade" }).notNull(),
  isiRespon: text().notNull(),
  dibuatOleh: text().notNull(),
  ...createdUpdated,
});

export const tiketResponseLampiranTable = pgTable("tiket_response_lampiran", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  idTiketResponse: integer().references(() => tiketResponseTable.id, { onDelete: "cascade" }).notNull(),
  storedName: text().notNull(),
  path: text().notNull(),
  originalName: text().notNull(),
  mimeType: text().notNull(),
  extension: text().notNull(),
  size: integer().notNull(),
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
