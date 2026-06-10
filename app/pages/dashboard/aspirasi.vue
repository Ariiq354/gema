<script setup lang="ts">
import AspirasiContainer from "~/features/aspirasi/AspirasiContainer.vue";

useHead({
  title: "Gema - Aspirasi",
});

definePageMeta({
  layout: "dashboard",
});
</script>

<template>
  <AspirasiContainer />
</template>
