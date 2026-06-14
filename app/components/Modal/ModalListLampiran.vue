<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import { UButton } from "#components";

export interface Lampiran {
  idTiket: number;
  storedName: string;
  path: string;
  originalName: string;
  mimeType: string;
  extension: string;
  size: number;
}

const { lampiran } = defineProps<{
  lampiran: Lampiran[];
}>();

const emit = defineEmits(["close"]);

const config = useRuntimeConfig();
const assetUrl = config.public.assetUrl;

function openFile(path: string) {
  window.open(
    `${assetUrl}/${path}`,
    "_blank",
    "noopener,noreferrer",
  );
}

const columns: TableColumn<Lampiran>[] = [
  {
    accessorKey: "originalName",
    header: "Nama Dokumen",
    cell: ({ row }) =>
      h(() => row.original.originalName.replace(/\.[^/.]+$/, "")),
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
            onClick: () => openFile(row.original.path),
          },
          () => "Lihat",
        ),
      ]),
  },
];
</script>

<template>
  <UModal
    :close="{ onClick: () => emit('close', false) }"
    :ui="{ body: 'sm:max-w-xl' }"
    title="List Laporan"
  >
    <template #body>
      <DataTable
        :data="lampiran ?? []"
        :columns="columns"
        :total="lampiran.length"
        enumerate
      />
    </template>
  </UModal>
</template>
