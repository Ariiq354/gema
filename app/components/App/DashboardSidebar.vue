<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const items: NavigationMenuItem[][] = [
  [
    {
      label: "Dashboard",
      icon: "i-lucide-layout-dashboard",
      to: "/dashboard",
    },
    {
      label: "Daftar Instansi",
      icon: "i-lucide-building-2",
      to: "/dashboard/instansi",
    },
    {
      label: "Pengaduan",
      icon: "i-lucide-inbox",
      badge: "4",
      to: "/dashboard/pengaduan",
    },
    {
      label: "Aspirasi",
      icon: "i-lucide-lightbulb",
      to: "/dashboard/aspirasi",
    },
    {
      label: "Pengajuan Informasi",
      icon: "i-lucide-book-open",
      to: "/dashboard/informasi",
    },
  ],
];

const isLoading = ref(false);
async function signOut() {
  await authClient.signOut({
    fetchOptions: {

      onRequest: () => {
        isLoading.value = true;
      },
      onSuccess: async () => {
        isLoading.value = false;
        await navigateTo("/login", { external: true });
      },
      onError: () => {
        isLoading.value = false;
        useToastError("Error", "Gagal keluar. Silahkan coba lagi.");
      },
    },
  });
}
</script>

<template>
  <UDashboardSidebar collapsible resizable :ui="{ footer: 'border-t border-default' }" class="bg-white-pointer-50">
    <div class="flex items-center gap-3 px-2 py-3">
      <NuxtImg
        src="/images/logo-gema.webp"
        alt="GEMA Logo"
        class="w-16 h-16 object-contain"
      />
      <div class="leading-tight">
        <h1 class="font-bold text-lg text-primary-800">
          KEMENAG BOGOR
        </h1>
        <p class="text-sm text-gray-500">
          Sistem Informasi
        </p>
      </div>
    </div>

    <UNavigationMenu
      :items="items[0]"
      :ui="{
        link: 'py-4 px-4 text-base font-medium',
        label: 'text-base',
        linkLeadingIcon: 'size-5',
      }"
      orientation="vertical"
    />

    <template #footer>
      <UButton
        icon="i-lucide-log-out"
        label="Logout"
        color="neutral"
        variant="ghost"
        class="w-full"
        :loading="isLoading"
        @click="signOut"
      />
    </template>
  </UDashboardSidebar>
</template>
