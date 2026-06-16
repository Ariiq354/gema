import type { TableColumn } from "@nuxt/ui";

export const baseColumns: TableColumn<any>[] = [
  { accessorKey: "noTiket", header: "No Tiket" },
  { accessorKey: "judul", header: "Judul" },
  { accessorKey: "isi", header: "Isi Aspirasi" },
  { accessorKey: "identitasPelapor", header: "Identitas Aspirator" },
];
