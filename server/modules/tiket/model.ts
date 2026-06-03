import { z } from "zod";
import { multipartFiles } from "~~/server/utils/schema";

const pengaduanSchema = z.object({
  jenis: z.literal("pengaduan"),
  judul: z.string().min(1),
  isi: z.string().min(1),
  tanggalKejadian: z.iso.date().transform(val => new Date(val)),
  lokasiKejadian: z.string().min(1),
  files: multipartFiles(),
});

const aspirasiSchema = z.object({
  jenis: z.literal("aspirasi"),
  judul: z.string().min(1),
  isi: z.string().min(1),
  asalPelapor: z.string().min(1),
});

const permintaanInformasiSchema = z.object({
  jenis: z.literal("permintaan_informasi"),
  judul: z.string().min(1),
  isi: z.string().min(1),
  asalPelapor: z.string().min(1),
});

export const createTiketSchema = z.discriminatedUnion(
  "jenis",
  [
    pengaduanSchema,
    aspirasiSchema,
    permintaanInformasiSchema,
  ],
);

export type CreateTiketSchema = z.infer<typeof createTiketSchema>;
