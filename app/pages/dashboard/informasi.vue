<script setup lang="ts">
import PermintaanInformasiContainer from "~/features/permintaan-informasi/PermintaanInformasiContainer.vue";

useHead({
  title: "Gema - Permintaan Informasi",
});

definePageMeta({
  layout: "dashboard",
});
</script>

<template>
  <PermintaanInformasiContainer />
</template>
