<script setup lang="ts">
import type { TabsItem } from "@nuxt/ui";
import DiterimaTable from "./components/DiterimaTable.vue";
import PendingTable from "./components/PendingTable.vue";

const items: TabsItem[] = [
  {
    label: "Pending",
    icon: "i-lucide-clock-4",
    slot: "pending",
  },
  {
    label: "Diterima",
    icon: "i-lucide-lock",
    slot: "diterima",
  },
  {
    label: "Selesai",
    icon: "i-lucide-file-check",
    slot: "selesai",
  },
];
</script>

<template>
  <div class="container flex items-center">
    <UTabs :items="items" class="w-full" variant="link">
      <template #pending>
        <PendingTable />
      </template>
      <template #diterima>
        <DiterimaTable />
      </template>
      <template #selesai>
        <DiterimaTable />
      </template>
    </UTabs>
  </div>
</template>
