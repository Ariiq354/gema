<script setup>
import { ref } from "vue";

const isOpen = ref(false);

const menuItems = [
  { label: "Home", to: "/" },
  { label: "Lacak Laporan", to: "/lacak-laporan" },
  { label: "Profil", to: "/profil" },
];
</script>

<template>
  <header class="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-7xl h-16 md:h-18 z-40">
    <div class="relative w-full h-full flex items-center justify-between px-4 md:px-6">
      <div class="absolute inset-0 border-2 border-primary-700 rounded-xl bg-white/10 backdrop-blur-[6px] z-0" />

      <div class="z-10 flex items-center justify-between w-full">
        <div class="flex items-center gap-3 md:gap-4">
          <NuxtImg src="/images/logo-gema.webp" class="w-10 h-10 md:w-12 md:h-12 object-contain" />
          <p class="text-eucalyptus-700 font-bold text-lg md:text-2xl leading-1">
            Gerbang Masukan <span class="invisible sm:visible">dan Aspirasi</span>
          </p>
        </div>

        <div class="hidden md:block">
          <ul class="flex items-center gap-5 font-medium">
            <li v-for="item in menuItems" :key="item.to">
              <NuxtLink :to="item.to" class="hover:text-primary-700 transition">
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div class="flex items-center gap-2">
          <UButton to="/login" class="hidden md:flex rounded-lg py-2 px-6 cursor-pointer">
            Masuk
          </UButton>

          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-bars-3"
            class="text-primary-700 scale-125 cursor-pointer md:hidden"
            @click="isOpen = true"
          />
        </div>
      </div>
    </div>
  </header>

  <UDrawer v-model:open="isOpen" direction="right" class="md:hidden">
    <template #content>
      <div class="p-6 flex flex-col w-screen h-full bg-white dark:bg-gray-900">
        <div class="flex items-center justify-between mb-8">
          <NuxtImg src="/images/logo-gema.webp" class="w-12 h-12 object-contain" />
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark"
            class="scale-110"
            @click="isOpen = false"
          />
        </div>

        <nav class="flex-1">
          <ul class="flex flex-col gap-4">
            <li v-for="item in menuItems" :key="item.to">
              <NuxtLink
                :to="item.to"
                class="flex items-center py-2 text-lg font-medium text-gray-700 dark:text-gray-200 hover:text-primary-700 transition"
                @click="isOpen = false"
              >
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <div class="mt-auto pt-6 border-t border-gray-100 dark:border-gray-800">
          <UButton
            to="/login"
            block
            class="rounded-lg py-2.5 text-center justify-center font-semibold"
            @click="isOpen = false"
          >
            Masuk
          </UButton>
        </div>
      </div>
    </template>
  </UDrawer>
</template>
