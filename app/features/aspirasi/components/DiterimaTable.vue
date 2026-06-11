<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import { h } from "vue";
import { UButton } from "#components";
import DataTable from "~/components/Custom/DataTable.vue";
import ModalProses from "~/components/Modal/ModalProses.vue";
import { baseColumns } from "../constants";

const props = defineProps<{
  search: string;
  idInstansi?: number;
}>();

const page = ref(1);
const query = computed(() => ({
  page: page.value,
  status: "proses",
  search: props.search,
  idInstansi: props.idInstansi,
}));

const { data, status, refresh } = await useLazyFetch("/api/v1/tiket/admin/aspirasi", {
  query,
});

async function handleVerifikasiTerima(id: number) {
  openModal(ModalProses, { path: `/api/v1/tiket/admin/${id}/selesai`, refresh });
}

const columns: TableColumn<any>[] = [
  ...baseColumns,
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
    v-model:page="page"
    :data="data?.data ?? []"
    :columns="columns"
    :total="data?.total ?? 0"
    :loading="status === 'pending'"
    enumerate
    pagination
  />
</template>
