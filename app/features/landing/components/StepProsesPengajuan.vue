<script setup lang="ts">
import type { StepperItem } from "@nuxt/ui";
import { ref } from "vue";

const activeStep = ref(1);

const items = ref<StepperItem[]>([
  {
    title: "Tulis Laporan",
    description: "Laporkan keluhan atau aspirasi anda dengan jelas dan lengkap",
    icon: "i-lucide-square-pen",
    disabled: activeStep.value !== 0,
  },
  {
    title: "Proses Verifikasi",
    description: "Dalam 3 hari, laporan Anda akan diverifikasi dan diteruskan",
    icon: "i-lucide-file-down",
    disabled: activeStep.value !== 1,
  },
  {
    title: "Proses Tindak Lanjut",
    description: "Instansi akan menindaklanjuti dan membalas laporan Anda",
    icon: "i-lucide-file-check-2",
    disabled: activeStep.value !== 2,
  },
  {
    title: "Selesai",
    description: "Laporan Anda akan terus ditindaklanjuti hingga terselesaikan",
    icon: "i-lucide-check",
    disabled: activeStep.value !== 3,
  },
]);
</script>

<template>
  <div class="relative my-10 md:my-0 md:mt-20 md:mb-40 px-4">
    <div class="container mx-auto max-w-5xl">
      <UStepper
        v-model="activeStep"
        :items="items"
        color="warning"
        orientation="vertical"
        class="md:hidden"
      >
        <template #indicator="{ item }">
          <UIcon :name="item.icon" class="size-5" />
        </template>

        <template #title="{ item }">
          <p class="text-base font-bold text-gray-900 dark:text-white mt-0.5">
            {{ item.title }}
          </p>
        </template>

        <template #description="{ item }">
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-1 mb-4">
            {{ item.description }}
          </p>
        </template>
      </UStepper>

      <UStepper
        v-model="activeStep"
        :items="items"
        color="warning"
        orientation="horizontal"
        class="hidden md:flex"
      >
        <template #indicator="{ item }">
          <UIcon :name="item.icon" class="size-5" />
        </template>

        <template #title="{ item }">
          <p class="max-w-42 text-center text-[16px] font-bold mx-auto my-2">
            {{ item.title }}
          </p>
        </template>

        <template #description="{ item }">
          <p class="max-w-42 text-center mx-auto text-sm">
            {{ item.description }}
          </p>
        </template>
      </UStepper>
    </div>
  </div>
</template>
