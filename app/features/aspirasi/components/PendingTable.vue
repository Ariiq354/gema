<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import { h } from "vue";
import { UButton } from "#components";
import DataTable from "~/components/Custom/DataTable.vue";
import ModalListLampiran from "~/components/Modal/ModalListLampiran.vue";
import ModalTerima from "~/components/Modal/ModalTerima.vue";
import { baseColumns } from "../constants";

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
  openModal(ModalTerima, { path: `/api/v1/tiket/admin/${id}/diterima`, refresh });
}

const columns: TableColumn<any>[] = [
  ...baseColumns,
  {
    accessorKey: "lampiran",
    header: "Lampiran",
    cell: ({ row }) => {
      const lampiran = row.original.lampiran ?? [];
      return h(
        UButton,
        {
          size: "sm",
          variant: "outline",
          class: "cursor-pointer",
          disabled: lampiran.length === 0,
          onClick: () => openModal(ModalListLampiran, { lampiran }),
        },
        () => lampiran.length > 0 ? `${lampiran.length} File` : "Tidak ada",
      );
    },
  },
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
