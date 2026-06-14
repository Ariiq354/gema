<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
}>();

const constantStore = useConstantStore();
</script>

<template>
  <div class="container md:py-6 py-3 flex items-center justify-between border-b border-gray-200">
    <div>
      <h1 class="md:text-4xl text-2xl text-primary-700 font-bold">
        {{ title }}
      </h1>

      <p class="mt-2 md:block hidden text-gray-500 md:text-base text-sm">
        {{ description }}
      </p>
    </div>
    <UButton
      icon="i-lucide-menu"
      class="md:hidden block p-0 bg-transparent text-black"
      aria-label="Sidebar toggle"
      @click="() => { constantStore.toggleMobileSidebar() }"
    />
  </div>
</template>
