<script setup lang="ts">
import AspirasiForm from "./components/AspirasiForm.vue";
import InformasiForm from "./components/InformasiForm.vue";
import LaporanTab from "./components/LaporanTab.vue";
import PengaduanForm from "./components/PengaduanForm.vue";

const activeTab = ref<"pengaduan" | "aspirasi" | "informasi">("pengaduan");
</script>

<template>
  <section class="min-h-screen">
    <div class="container mx-auto px-4 mt-40">
      <div class="text-center mb-12">
        <h1 class="text-5xl font-bold mb-4">
          Layanan Aspirasi dan Pengaduan Online Rakyat
        </h1>

        <p class="text-lg font-semibold">
          Sampaikan aspirasi dan pengaduan Anda secara online, lebih cepat dan praktis!
        </p>
      </div>

      <div class="max-w-5xl mx-auto bg-white rounded-xl p-8 shadow-lg">
        <h2 class="text-3xl font-bold text-center mb-8">
          Sampaikan Laporan Anda
        </h2>

        <LaporanTab v-model="activeTab" />

        <PengaduanForm
          v-if="activeTab === 'pengaduan'"
        />

        <AspirasiForm
          v-else-if="activeTab === 'aspirasi'"
        />

        <InformasiForm
          v-else
        />
      </div>
    </div>
  </section>
</template>
