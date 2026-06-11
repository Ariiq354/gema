<script setup lang="ts">
const searchModel = defineModel<string>({ required: true });

const searchDebounced = useDebounceFn((v) => {
  searchModel.value = v;
}, 500);
</script>

<template>
  <UInput
    :model-value="searchModel"
    leading-icon="i-lucide-search"
    placeholder="Cari..."
    @update:model-value="searchDebounced"
  />
</template>
