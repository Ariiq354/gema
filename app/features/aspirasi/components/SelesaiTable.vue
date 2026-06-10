<script setup lang="ts">
import type { ColumnDef } from "@tanstack/vue-table";
import { UBadge } from "#components";
import DataTable from "~/components/Custom/DataTable.vue";

const props = defineProps<{
  search: string;
  idInstansi?: number;
}>();

const page = ref(1);

const query = computed(() => ({
  page: page.value,
  status: "selesai",
  search: props.search,
  idInstansi: props.idInstansi,
}));

const { data, status } = await useFetch("/api/v1/tiket/admin/aspirasi", {
  query,
});

const columns: ColumnDef<any>[] = [
  { accessorKey: "noTiket", header: "No Tiket" },
  { accessorKey: "judul", header: "Judul" },
  { accessorKey: "isi", header: "Isi Laporan" },
  { accessorKey: "asalPelapor", header: "Asal Pelapor" },
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
  <div v-if="status === 'pending'" class="py-10 flex justify-center">
    <UIcon
      name="i-lucide-loader-circle"
      class="size-8 animate-spin text-primary"
    />
  </div>

  <DataTable
    v-else
    v-model:page="page"
    :data="data?.data ?? []"
    :columns="columns"
    :total="data?.total ?? 0"
    enumerate
    pagination
  />
</template>
