<script setup lang="ts">
import LandingNavbar from "@/components/LandingNavbar.vue";
import LandingFooter from "~/components/LandingFooter.vue";
</script>

<template>
  <main>
    <LandingNavbar />
    <slot />
    <LandingFooter />
  </main>
</template>
