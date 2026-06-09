<script setup lang="ts">
import type { ColumnDef } from "@tanstack/vue-table";
import { UBadge } from "#components";
import DataTable from "~/components/Custom/DataTable.vue";

const query = ref({ page: 1, status: "selesai" });

const { data, status } = await useFetch("/api/v1/tiket/admin/pengaduan", {
  query,
});

const columns: ColumnDef<any>[] = [
  { accessorKey: "noTiket", header: "No Tiket" },
  { accessorKey: "judul", header: "Judul" },
  { accessorKey: "isi", header: "Isi Laporan" },
  { accessorKey: "tanggalKejadian", header: "Tanggal Kejadian" },
  { accessorKey: "lokasiKejadian", header: "Lokasi Kejadian" },
  { accessorKey: "status", header: "Status", cell: ({ row }) =>
    h(
      UBadge,
      {
        size: "lg",
        color: "success",
        variant: "subtle",
      },
      () => row.original.status,
    ) },
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
