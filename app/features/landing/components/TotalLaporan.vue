<script setup lang="ts">
const { data: count, status } = await useLazyFetch("/api/v1/tiket/count");
</script>

<template>
  <div class="bg-eucalyptus-800 flex items-center justify-center py-12 md:py-16 mt-16 md:mt-24 px-4 text-center">
    <div class="text-white flex flex-col items-center justify-center gap-3 md:gap-4 max-w-xl">
      <p class="text-xl md:text-3xl font-semibold tracking-wide opacity-90">
        Jumlah Laporan Masuk
      </p>

      <USkeleton v-if="status === 'pending'" class="w-32 h-10 rounded-lg bg-gray-300 animate-pulse" />
      <p v-else class="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
        {{ count }}
      </p>
    </div>
  </div>
</template>
