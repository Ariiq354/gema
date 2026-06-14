<script setup lang="ts">
import type { TabsItem } from "@nuxt/ui";
import OptionInstansi from "~/components/Option/OptionInstansi.vue";
import DiterimaTable from "./components/DiterimaTable.vue";
import PendingTable from "./components/PendingTable.vue";
import SelesaiTable from "./components/SelesaiTable.vue";

const search = ref("");
const idInstansi = ref<number>();
const isDesktop = useMediaQuery("(min-width: 768px)");

const items = computed<TabsItem[]>(() => [
  {
    label: isDesktop.value ? "Pending" : undefined,
    icon: "i-lucide-clock-4",
    slot: "pending",
  },
  {
    label: isDesktop.value ? "Diterima" : undefined,
    icon: "i-lucide-lock",
    slot: "diterima",
  },
  {
    label: isDesktop.value ? "Selesai" : undefined,
    icon: "i-lucide-file-check",
    slot: "selesai",
  },
]);
</script>

<template>
  <main class="w-full min-h-screen bg-[#F8F7FA]">
    <DashboardTopbar
      title="Manajemen Aspirasi"
      description="Kelola aspirasi masyarakat yang masuk"
    />

    <div class="container my-6">
      <div class="rounded-lg bg-white shadow-sm flex md:flex-row flex-col gap-4 p-5">
        <InputSearch v-model="search" placeholder="Search.." />
        <OptionInstansi v-model="idInstansi" />
      </div>
      <div class="rounded-lg bg-white shadow-sm flex items-center p-5 mt-8">
        <UTabs :items="items" class="w-full" variant="link">
          <template #pending>
            <PendingTable :search="search" :id-instansi="idInstansi" />
          </template>
          <template #diterima>
            <DiterimaTable :search="search" :id-instansi="idInstansi" />
          </template>
          <template #selesai>
            <SelesaiTable :search="search" :id-instansi="idInstansi" />
          </template>
        </UTabs>
      </div>
    </div>
  </main>
</template>
