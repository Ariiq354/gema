<script setup lang="ts">
import type { ColumnDef } from "@tanstack/vue-table";
import { h } from "vue";
import { UButton } from "#components";
import DataTable from "~/components/Custom/DataTable.vue";

const props = defineProps<{
  search: string;
  idInstansi?: number;
}>();

const page = ref(1);

const query = computed(() => ({
  page: page.value,
  status: "pending",
  search: props.search,
  idInstansi: props.idInstansi,
}));

const { data, status, refresh } = await useLazyFetch("/api/v1/tiket/admin/aspirasi", {
  query,
});

async function handleVerifikasiTerima(id: number) {
  openConfirmModalTerimaLaporan(`/api/v1/tiket/admin/${id}/diterima`, refresh);
}

const columns: ColumnDef<any>[] = [
  { accessorKey: "noTiket", header: "No Tiket" },
  { accessorKey: "judul", header: "Judul" },
  { accessorKey: "isi", header: "Isi Laporan" },
  { accessorKey: "asalPelapor", header: "Asal Pelapor" },
  {
    accessorKey: "aksi",
    header: "Aksi",
    cell: ({ row }) =>
      h("div", { class: "flex gap-2" }, [
        h(
          UButton,
          {
            size: "sm",
            class: "cursor-pointer",
            onClick: () => handleVerifikasiTerima(row.original.id),
          },
          () => "Verifikasi",
        ),
      ]),
  },
];
</script>

<template>
  <DataTable
    v-model:page="page"
    :data="data?.data ?? []"
    :columns="columns"
    :total="data?.total ?? 0"
    :loading="status === 'pending'"
    enumerate
    pagination
  />
</template>
