import { z } from "zod";
import { multipartFiles, paginationSearchSchema } from "~~/server/utils/schema";

const baseSchema = z.object({
  judul: z.string().min(1),
  isi: z.string().min(1),
  idInstansi: z.coerce.number().optional(),
  files: multipartFiles(),
});

const masukanSchema = z.object({
  jenis: z.literal("masukan"),
  tanggalKejadian: z.iso.date(),
  lokasiKejadian: z.string().min(1),
  ...baseSchema.shape,
});

const aspirasiSchema = z.object({
  jenis: z.literal("aspirasi"),
  identitasPelapor: z.string().min(1),
  ...baseSchema.shape,
});

export const createTiketSchema = z.discriminatedUnion(
  "jenis",
  [
    masukanSchema,
    aspirasiSchema,
  ],
);

export type CreateTiketSchema = z.infer<typeof createTiketSchema>;

export const getTiketSchema = z.object({
  noTiket: z.string().min(1),
});

export type GetTiketSchema = z.infer<typeof getTiketSchema>;

export const createTiketDiterimaSchema = z.object({
  catatan: z.string().min(1),
});

export type CreateTiketDiterimaSchema = z.infer<typeof createTiketDiterimaSchema>;

export const createTiketResponseSchema = z.object({
  isiRespon: z.string().min(1),
  dibuatOleh: z.string().min(1),
});

export type CreateTiketResponseSchema = z.infer<typeof createTiketResponseSchema>;

export type Jenis = "masukan" | "aspirasi";

interface Lampiran {
  storedName: string;
  path: string;
  originalName: string;
  mimeType: string;
  extension: string;
  size: number;
}

export interface FindAllResultMap {
  masukan: {
    id: number;
    noTiket: string;
    judul: string;
    isi: string;
    idInstansi: number | null;
    status: string;
    tanggalKejadian: string;
    lokasiKejadian: string;
    lampiran: Lampiran[];
  };
  aspirasi: {
    id: number;
    noTiket: string;
    judul: string;
    isi: string;
    idInstansi: number | null;
    status: string;
    identitasPelapor: string;
    lampiran: Lampiran[];
  };
}

export const getTiketRequestSchema = z.object({
  ...paginationSearchSchema.shape,
  idInstansi: z.number().optional(),
  status: z.enum(["pending", "proses", "selesai"]).optional(),
});

export type GetTiketRequestSchema = z.infer<typeof getTiketRequestSchema>;
