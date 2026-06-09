<script setup lang="ts">
import type { ColumnDef } from "@tanstack/vue-table";
import { h } from "vue";
import { UButton } from "#components";
import DataTable from "~/components/Custom/DataTable.vue";

const query = ref({ page: 1, status: "proses" });

const { data, status, refresh } = await useFetch("/api/v1/tiket/admin/pengaduan", {
  query,
});

async function handleVerifikasiTerima(id: number) {
  openConfirmModalProsesLaporan(`/api/v1/tiket/admin/${id}/selesai`, refresh);
}

const columns: ColumnDef<any>[] = [
  { accessorKey: "noTiket", header: "No Tiket" },
  { accessorKey: "judul", header: "Judul" },
  { accessorKey: "isi", header: "Isi Laporan" },
  { accessorKey: "tanggalKejadian", header: "Tanggal Kejadian" },
  { accessorKey: "lokasiKejadian", header: "Lokasi Kejadian" },
  {
    accessorKey: "aksi",
    header: "Aksi",
    cell: ({ row }) =>
      h("div", { class: "flex gap-2" }, [
        h(
          UButton,
          {
            size: "sm",
            class: "bg-golden-grass-500 hover:bg-golden-grass-600 cursor-pointer",
            onClick: () => handleVerifikasiTerima(row.original.id),
          },
          () => "Proses",
        ),
      ]),
  },
];
</script>

<template>
  <DataTable
    v-model:page="query.page"
    :data="data?.data ?? []"
    :columns="columns"
    :loading="status === 'pending'"
    :total="data?.total ?? 0"
    enumerate
    pagination
  />
</template>
