<script setup lang="ts">
const id = defineModel<number | undefined>({ required: true });
const { data: listInstansi, pending } = await useLazyFetch("/api/v1/instansi/active");
</script>

<template>
  <USelectMenu
    v-model="id"
    :items="listInstansi"
    class="w-full"
    label-key="nama"
    value-key="id"
    placeholder="Pilih Instansi Tujuan"
    :loading="pending"
  />
</template>
