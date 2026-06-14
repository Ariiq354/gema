<script setup lang="ts">
import MasukanContainer from "~/features/masukan/MasukanContainer.vue";

useHead({
  title: "Gema - Masukan",
});
definePageMeta({
  layout: "dashboard",
});
</script>

<template>
  <MasukanContainer />
</template>
