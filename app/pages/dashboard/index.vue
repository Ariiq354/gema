<script setup lang="ts">
import ContainerDashboard from "~/features/dashboard/ContainerDashboard.vue";

useHead({
  title: "Gema - Dashboard",
});
definePageMeta({
  layout: "dashboard",
});
</script>

<template>
  <ContainerDashboard />
</template>
