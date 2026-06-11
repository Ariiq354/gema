<script setup lang="ts">
import type { TabsItem } from "@nuxt/ui";
import OptionInstansi from "~/components/Option/OptionInstansi.vue";
import DiterimaTable from "./components/DiterimaTable.vue";
import PendingTable from "./components/PendingTable.vue";
import SelesaiTable from "./components/SelesaiTable.vue";

const search = ref("");
const idInstansi = ref<number>();

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
  <section class="w-full bg-[#F8F7FA]">
    <div class="container py-6 border-b border-gray-200">
      <h1 class="text-4xl text-primary-700 font-bold">
        Manajemen Pengaduan
      </h1>
    </div>

    <div class="container my-6">
      <div class="rounded-lg bg-white shadow-sm flex gap-4 p-5">
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
  </section>
</template>
