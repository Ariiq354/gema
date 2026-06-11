<script setup lang="ts">
import LoginContainer from "~/features/auth/LoginContainer.vue";

useHead({
  title: "Gema - Login",
});
definePageMeta({
  layout: "auth",
});
</script>

<template>
  <LoginContainer />
</template>
