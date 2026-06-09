<script setup lang="ts">
import type { ColumnDef } from "@tanstack/vue-table";
import { h } from "vue";
import { UButton } from "#components";
import DataTable from "~/components/Custom/DataTable.vue";

const query = ref({ page: 1, status: "pending" });

const { data, status, refresh } = await useFetch("/api/v1/tiket/admin/pengaduan", {
  query,
});

async function handleVerifikasiTerima(id: number) {
  openConfirmModalTerimaLaporan(`/api/v1/tiket/admin/${id}/diterima`, refresh);
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
            onClick: () => handleVerifikasiTerima(Number(row.id)),
          },
          () => "Verifikasi",
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
