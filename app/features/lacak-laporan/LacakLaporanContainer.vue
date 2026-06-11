<script setup lang="ts">
import type { ITiketData } from "./constant.js";
import { FetchError } from "ofetch";
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
  <div class="bg-white-pointer-50 min-h-195">
    <div class="container mx-auto pt-40 pb-20">
      <div
        class="bg-white py-10 flex flex-col items-center justify-center gap-8 rounded-xl shadow-sm"
      >
        <p class="text-4xl font-bold text-primary">
          Pantau Status Laporan Anda
        </p>

        <p class="w-175 text-wrap text-center">
          Masukkan Nomor Tiket / Tracking ID laporan yang telah Anda kirimkan
          untuk melihat perkembangan penanganan secara real-time.
        </p>

        <div class="flex gap-2">
          <UInput
            v-model="noTiket"
            type="text"
            placeholder="GEMA-XXXX-XXXX"
            :ui="{
              base: 'bg-eucalyptus-50',
            }"
            class="focus:ring-white-pointer-200 w-96"
            @keyup.enter="onSubmit"
          />

          <UButton
            :loading="isLoading"
            class="flex items-center justify-center gap-2 cursor-pointer px-4 py-1"
            @click="onSubmit"
          >
            <UIcon
              v-if="!isLoading"
              name="i-lucide-search"
              class="text-base"
            />
            <p class="text-base">
              Lacak
            </p>
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
      />
    </div>
  </div>
</template>
