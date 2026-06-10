<script setup lang="ts">
const id = defineModel<number | undefined>({ required: true });
const { data: listInstansi, pending } = await useLazyFetch("/api/v1/instansi/active");
</script>

<template>
  <USelectMenu
    v-model="id"
    placeholder="Pilih Instansi Tujuan"
    class="w-full"
    label-key="nama"
    value-key="id"
    :items="listInstansi"
    :loading="pending"
    clear
  />
</template>
