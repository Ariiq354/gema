import type { TableColumn } from "@nuxt/ui";

export const baseColumns: TableColumn<any>[] = [
  { accessorKey: "noTiket", header: "No Tiket" },
  { accessorKey: "judul", header: "Judul" },
  { accessorKey: "isi", header: "Isi Laporan" },
  { accessorKey: "identitasPelapor", header: "Identitas Pelapor" },
];
