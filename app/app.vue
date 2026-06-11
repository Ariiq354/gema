<script setup lang="ts">
useSeoMeta({
  description: "Gema - Gerbang Masukan dan Aspirasi",
});

useHead({
  htmlAttrs: {
    lang: "id",
  },
});
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator :height="5" />
    <UApp>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UApp>
  </div>
</template>
