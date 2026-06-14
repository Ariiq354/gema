<script setup lang="ts">
import { TABS } from "../constant";

defineProps<{
  modelValue: string;
}>();

const emit = defineEmits([
  "update:modelValue",
]);

function setTab(tab: string) {
  emit("update:modelValue", tab);
}
</script>

<template>
  <div class="mb-6 md:mb-10">
    <label class="block font-semibold mb-3 text-gray-900 dark:text-gray-100 text-center md:text-left">
      Pilih Klasifikasi Laporan
    </label>

    <div
      class="grid grid-cols-1 md:grid-cols-2 border border-eucalyptus-700 rounded-xl overflow-hidden divide-y md:divide-y-0 md:divide-x divide-eucalyptus-700"
    >
      <button
        v-for="tab in TABS"
        :key="tab.key"
        type="button"
        class="py-3.5 md:py-4 font-semibold transition cursor-pointer w-full text-left md:text-center"
        :class="[
          modelValue === tab.key
            ? 'bg-eucalyptus-700 text-white'
            : 'bg-white dark:bg-gray-900 text-eucalyptus-700 hover:bg-eucalyptus-50 dark:hover:bg-gray-800',
        ]"
        @click="setTab(tab.key)"
      >
        <div class="flex items-center md:justify-center gap-3 px-5">
          <span
            class="size-4 shrink-0 rounded-full border-2 flex items-center justify-center"
            :class="
              modelValue === tab.key
                ? 'border-white'
                : 'border-eucalyptus-700'
            "
          >
            <span
              v-if="modelValue === tab.key"
              class="size-2 rounded-full bg-white"
            />
          </span>

          <span class="text-sm md:text-base tracking-wide whitespace-normal md:whitespace-nowrap">
            {{ tab.label }}
          </span>
        </div>
      </button>
    </div>

    <p class="text-center text-sm md:text-base mt-6 text-gray-600 dark:text-gray-400 px-2">
      Perhatikan Cara Menyampaikan Pengaduan Yang Baik dan Benar
    </p>
  </div>
</template>
