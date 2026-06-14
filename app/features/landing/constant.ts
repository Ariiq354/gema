import { z } from "zod";

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const baseSchema = z.object({
  judul: z.string().min(1, "Judul laporan wajib diisi"),
  isi: z.string().min(1, "Isi laporan wajib diisi"),
  idInstansi: z.number().optional(),
  files: z
    .array(
      z
        .file()
        .max(MAX_FILE_SIZE, "Ukuran file tidak boleh lebih dari 10MB")
        .mime([
          "application/pdf",
          "application/msword",
          "image/jpeg",
          "image/png",
        ]),
    )
    .optional(),
});

export const masukanSchema = z.object({
  jenis: z.literal("masukan"),
  tanggalKejadian: z.iso.date(),
  lokasiKejadian: z.string().min(1, "Lokasi laporan wajib diisi"),
  ...baseSchema.shape,
});

export const aspirasiSchema = z.object({
  jenis: z.literal("aspirasi"),
  identitasPelapor: z.string().min(1, "Identitas Pelapor wajib diisi"),
  ...baseSchema.shape,
});

export const laporanSchema = z.discriminatedUnion("jenis", [
  masukanSchema,
  aspirasiSchema,
]);

export type LaporanFormSchema = z.infer<typeof laporanSchema>;

export const initialFormDataMasukan: z.infer<typeof masukanSchema> = {
  jenis: "masukan",
  judul: "",
  isi: "",
  tanggalKejadian: "",
  lokasiKejadian: "",
  idInstansi: undefined,
  files: [],
};

export const initialFormDataAspirasi: z.infer<typeof aspirasiSchema> = {
  jenis: "aspirasi",
  judul: "",
  isi: "",
  identitasPelapor: "",
  files: [],
};

export const initialFormDataByJenis = {
  masukan: initialFormDataMasukan,
  aspirasi: initialFormDataAspirasi,
} as const;

export const TABS = [
  {
    key: "masukan",
    label: "MASUKAN",
  },
  {
    key: "aspirasi",
    label: "ASPIRASI",
  },
];
