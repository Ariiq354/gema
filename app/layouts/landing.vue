<script setup lang="ts">
import LandingNavbar from "@/components/LandingNavbar.vue";
</script>

<template>
  <main class="bg-teal-800">
    <LandingNavbar />
    <slot />
  </main>
</template>
