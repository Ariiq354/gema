import { z } from "zod";
import { multipartFiles } from "~~/server/utils/schema";

const baseSchema = z.object({
  judul: z.string().min(1),
  isi: z.string().min(1),
  files: multipartFiles(),
});

const pengaduanSchema = z.object({
  jenis: z.literal("pengaduan"),
  tanggalKejadian: z.iso.date().transform(val => new Date(val)),
  lokasiKejadian: z.string().min(1),
  ...baseSchema.shape,
});

const aspirasiSchema = z.object({
  jenis: z.literal("aspirasi"),
  asalPelapor: z.string().min(1),
  ...baseSchema.shape,
});

const permintaanInformasiSchema = z.object({
  jenis: z.literal("permintaan_informasi"),
  asalPelapor: z.string().min(1),
  ...baseSchema.shape,
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

export const getTiketSchema = z.object({
  noTiket: z.string().min(1),
});

export type GetTiketSchema = z.infer<typeof getTiketSchema>;
