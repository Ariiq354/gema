import type { TableColumn } from "@nuxt/ui";

export const baseColumns: TableColumn<any>[] = [
  { accessorKey: "noTiket", header: "No Tiket" },
  { accessorKey: "judul", header: "Judul" },
  { accessorKey: "isi", header: "Isi Masukan" },
  { accessorKey: "identitasPelapor", header: "Identitas Aspirator" },
];
