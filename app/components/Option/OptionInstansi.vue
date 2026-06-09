<script setup lang="ts">
const id = defineModel<number | undefined>({ required: true });
const { data: listInstansi, pending } = await useFetch("/api/v1/instansi/active");
</script>

<template>
  <UFormField label="Instansi Tujuan" name="idInstansi">
    <USelect
      v-model="id"
      :items="listInstansi"
      class="w-full"
      label-key="nama"
      value-key="id"
      placeholder="Pilih Instansi Tujuan"
      :loading="pending"
      :disabled="pending"
    />
  </UFormField>
</template>
