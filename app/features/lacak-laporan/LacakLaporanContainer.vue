<script setup lang="ts">
import type { ITiketData } from "./constant.js";
import { FetchError } from "ofetch";
import { ref } from "vue";
import StatusPenanganan from "./components/StatusPenanganan.vue";

const noTiket = ref("");
const isLoading = ref(false);
const tiketData = ref<ITiketData>();

async function onSubmit() {
  if (!noTiket.value.trim()) {
    useToastError("Validasi", "Nomor tiket harus diisi");
    return;
  }

  isLoading.value = true;

  try {
    const res = await $fetch("/api/v1/tiket", {
      method: "GET",
      query: {
        noTiket: noTiket.value,
      },
    });
    tiketData.value = res;
  }
  catch (error) {
    if (error instanceof FetchError) {
      useToastError(
        "Submit Failed",
        error.data?.message || "Terjadi kesalahan",
      );
    }
    else {
      useToastError("Submit Failed", "Internal Server Error");
    }
  }
  finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="bg-white-pointer-50 min-h-160 md:min-h-190 px-4">
    <div class="md:container mx-auto pt-28 md:pt-40 pb-20 max-w-4xl">
      <div
        class="bg-white py-8 md:py-10 px-4 sm:px-6 md:px-8 flex flex-col items-center justify-center gap-6 md:gap-8 rounded-xl shadow-sm border border-gray-100"
      >
        <p class="text-2xl sm:text-3xl md:text-4xl font-semibold md:font-bold text-primary text-center leading-tight">
          Pantau Status Laporan Anda
        </p>

        <p class="max-w-xl text-center text-sm md:text-base text-gray-600">
          Masukkan Nomor Tiket / Tracking ID laporan yang telah Anda kirimkan
          untuk melihat perkembangan penanganan secara real-time.
        </p>

        <div class="flex flex-col sm:flex-row gap-3 w-full max-w-md justify-center">
          <UInput
            v-model="noTiket"
            type="text"
            placeholder="GEMA-XXXX-XXXX"
            size="lg"
            :ui="{
              base: 'bg-eucalyptus-50',
            }"
            class="focus:ring-white-pointer-200 w-full"
            @keyup.enter="onSubmit"
          />

          <UButton
            :loading="isLoading"
            size="lg"
            class="flex items-center justify-center gap-2 cursor-pointer px-6 py-2 w-full sm:w-auto shrink-0"
            @click="onSubmit"
          >
            <UIcon
              v-if="!isLoading"
              name="i-lucide-search"
              class="text-base"
            />
            <span class="text-base font-semibold">
              Lacak
            </span>
          </UButton>
        </div>
      </div>

      <div v-if="isLoading" class="mt-8 flex justify-center py-12">
        <UIcon
          name="i-line-md-loading-twotone-loop"
          class="text-4xl text-primary animate-spin"
        />
      </div>
      <StatusPenanganan
        v-else-if="tiketData"
        :data="tiketData"
        class="mt-8"
      />
    </div>
  </div>
</template>
