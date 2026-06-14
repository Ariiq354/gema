<script setup lang="ts">
import { ref } from "vue";
import AspirasiForm from "./components/AspirasiForm.vue";
import LaporanTab from "./components/LaporanTab.vue";
import MasukanForm from "./components/MasukanForm.vue";
import StepProsesPengajuan from "./components/StepProsesPengajuan.vue";
import TotalLaporan from "./components/TotalLaporan.vue";

const activeTab = ref<"masukan" | "aspirasi" | "informasi">("masukan");
</script>

<template>
  <section class="relative min-h-screen">
    <div class="absolute top-0 left-0 w-full h-screen md:h-125 lg:h-auto -z-10 overflow-hidden">
      <NuxtImg
        src="/images/hero-kemenag.webp"
        class="w-full h-full object-cover rotate-180"
      />
    </div>

    <div class="container mx-auto px-4 pt-32 md:pt-48 pb-12">
      <div class="text-center mb-10 md:mb-20 max-w-4xl mx-auto">
        <h1 class="text-3xl md:text-5xl font-bold mb-4 leading-tight dark:text-white">
          Gerbang Masukan dan Aspirasi Online Masyarakat
        </h1>

        <p class="text-base md:text-lg font-semibold text-gray-700 dark:text-gray-300">
          Sampaikan masukan dan aspirasi Anda secara online, lebih cepat dan praktis!
        </p>
      </div>

      <div class="max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-6 md:p-8 shadow-lg border border-gray-100 dark:border-gray-800">
        <h2 class="text-xl md:text-3xl font-bold text-center mb-6 md:mb-8 text-gray-900 dark:text-white">
          Sampaikan Laporan Anda
        </h2>

        <LaporanTab v-model="activeTab" class="mb-6" />

        <div class="mt-4">
          <MasukanForm
            v-if="activeTab === 'masukan'"
          />

          <AspirasiForm
            v-else-if="activeTab === 'aspirasi'"
          />
        </div>
      </div>
    </div>

    <StepProsesPengajuan />
    <TotalLaporan />
  </section>
</template>
