import { z } from "zod";
import { paginationSearchSchema } from "~~/server/utils/schema";

const baseSchema = z.object({
  judul: z.string().min(1),
  isi: z.string().min(1),
  idInstansi: z.number().min(1),
});

const pengaduanSchema = z.object({
  jenis: z.literal("pengaduan"),
  tanggalKejadian: z.iso.date(),
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

export const createTiketDiterimaSchema = z.object({
  catatan: z.string().min(1),
});

export type CreateTiketDiterimaSchema = z.infer<typeof createTiketDiterimaSchema>;

export const createTiketResponseSchema = z.object({
  isiRespon: z.string().min(1),
  dibuatOleh: z.string().min(1),
});

export type CreateTiketResponseSchema = z.infer<typeof createTiketResponseSchema>;

export type Jenis = "pengaduan" | "aspirasi" | "permintaan_informasi";

export interface FindAllResultMap {
  pengaduan: {
    id: number;
    noTiket: string;
    judul: string;
    isi: string;
    idInstansi: number;
    status: string;
    tanggalKejadian: Date;
    lokasiKejadian: string;
  };
  aspirasi: {
    id: number;
    noTiket: string;
    judul: string;
    isi: string;
    idInstansi: number;
    status: string;
    asalPelapor: string;
  };
  permintaan_informasi: {
    id: number;
    noTiket: string;
    judul: string;
    isi: string;
    idInstansi: number;
    status: string;
    asalPelapor: string;
  };
}

export const getTiketRequestSchema = z.object({
  ...paginationSearchSchema.shape,
  idInstansi: z.number().optional(),
});

export type GetTiketRequestSchema = z.infer<typeof getTiketRequestSchema>;
