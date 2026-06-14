<script setup lang="ts">
const id = defineModel<number | undefined>({ required: true });
const { data: listInstansi, status } = await useLazyFetch("/api/v1/instansi/active");
</script>

<template>
  <ClearableSelectMenu
    v-model="id"
    placeholder="Pilih Instansi Tujuan"
    label-key="nama"
    value-key="id"
    :items="listInstansi"
    :loading="status === 'pending'"
  />
</template>
