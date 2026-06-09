<script setup lang="ts">
import { computed } from "vue";

interface IStatusHistory {
  statusSebelumnya: "selesai" | "pending" | "proses" | null;
  statusBaru: "selesai" | "pending" | "proses";
  catatan: string | null;
  tanggal: string | null;
}

export interface ITiketData {
  instansi: string | null;
  id: number;
  noTiket: string;
  jenis: "aspirasi" | "pengaduan" | "permintaan_informasi";
  status: "selesai" | "pending" | "proses";
  judul: string;
  isi: string;
  tanggalDibuat: string;
  statusHistory: IStatusHistory[];
}

const props = defineProps<{
  data: ITiketData;
}>();

const latestHistory = computed(() => {
  return props.data.statusHistory?.[props.data.statusHistory.length - 1];
});

function formatDate(date?: string | null) {
  if (!date) {
    return "-";
  }

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

const statusLabel = computed(() => {
  switch (props.data.status) {
    case "pending":
      return "Menunggu Verifikasi";

    case "proses":
      return "Sedang Diproses";

    case "selesai":
      return "Selesai";

    default:
      return props.data.status;
  }
});

const currentStep = computed(() => {
  switch (props.data.status) {
    case "pending":
      return 2;

    case "proses":
      return 3;

    case "selesai":
      return 4;

    default:
      return 1;
  }
});

function getStepClass(step: number) {
  if (currentStep.value === 4) {
    return "bg-eucalyptus-700 text-white";
  }

  if (step < currentStep.value) {
    return "bg-eucalyptus-700 text-white";
  }

  if (step === currentStep.value) {
    return "bg-white border border-golden-grass-400 text-golden-grass-400";
  }

  return "bg-white-pointer-100 text-gray-400";
}

function getStepTextClass(step: number) {
  if (currentStep.value === 4) {
    return "text-black";
  }

  if (step < currentStep.value) {
    return "text-black";
  }

  if (step === currentStep.value) {
    return "text-golden-grass-400";
  }

  return "text-gray-400";
}

function getStepIcon(step: number) {
  if (currentStep.value === 4) {
    return "i-material-symbols-check-rounded";
  }

  if (step < currentStep.value) {
    return "i-material-symbols-check-rounded";
  }

  if (step === currentStep.value) {
    return "i-ant-design-hourglass-outlined";
  }

  return "i-material-symbols-check-rounded";
}
</script>

<template>
  <!-- STATUS PENANGANAN -->
  <div
    class="bg-white p-10 flex flex-col items-center justify-center gap-8 rounded-xl shadow-sm mt-8"
  >
    <div class="w-full flex items-start justify-between">
      <div class="flex flex-col gap-2">
        <p class="text-xl font-semibold">
          Status Penanganan
        </p>

        <p class="text-sm">
          Update terakhir:
          <span>
            {{
              latestHistory?.tanggal
                ? formatDate(latestHistory.tanggal)
                : formatDate(data.tanggalDibuat)
            }}
          </span>
        </p>
      </div>

      <div
        class="rounded-full bg-golden-grass-500 text-white px-4 py-1 flex items-center gap-2"
      >
        <UIcon
          name="i-mdi-rotate-3d-variant"
          class="rotate-90"
        />
        <p>{{ statusLabel }}</p>
      </div>
    </div>

    <div class="w-full flex justify-evenly">
      <!-- DIKIRIM -->
      <div class="flex flex-col items-center justify-center gap-3">
        <div
          class="flex items-center justify-center rounded-full bg-eucalyptus-700 text-white w-12 h-12"
        >
          <UIcon
            name="i-material-symbols-check-rounded"
            class="text-2xl"
          />
        </div>

        <div class="flex flex-col items-center justify-center">
          <p class="font-semibold text-black">
            Dikirim
          </p>

          <p class="text-sm">
            {{ formatDate(data.tanggalDibuat) }}
          </p>
        </div>
      </div>

      <!-- DIVERIFIKASI -->
      <div class="flex flex-col items-center justify-center gap-3">
        <div
          class="flex items-center justify-center rounded-full w-12 h-12"
          :class="getStepClass(2)"
        >
          <UIcon
            :name="getStepIcon(2)"
            class="text-2xl"
          />
        </div>

        <div class="flex flex-col items-center justify-center">
          <p
            class="font-semibold"
            :class="getStepTextClass(2)"
          >
            Diverifikasi
          </p>

          <p
            class="text-sm"
            :class="currentStep >= 2 ? '' : 'text-gray-400'"
          >
            {{ currentStep >= 2 ? "Aktif" : "Menunggu" }}
          </p>
        </div>
      </div>

      <!-- DIPROSES -->
      <div class="flex flex-col items-center justify-center gap-3">
        <div
          class="flex items-center justify-center rounded-full w-12 h-12"
          :class="getStepClass(3)"
        >
          <UIcon
            :name="getStepIcon(3)"
            class="text-2xl"
          />
        </div>

        <div class="flex flex-col items-center justify-center">
          <p
            class="font-semibold"
            :class="getStepTextClass(3)"
          >
            Diproses
          </p>

          <p
            class="text-sm"
            :class="currentStep >= 3 ? '' : 'text-gray-400'"
          >
            {{ currentStep >= 3 ? "Aktif" : "Menunggu" }}
          </p>
        </div>
      </div>

      <!-- SELESAI -->
      <div class="flex flex-col items-center justify-center gap-3">
        <div
          class="flex items-center justify-center rounded-full w-12 h-12"
          :class="getStepClass(4)"
        >
          <UIcon
            :name="getStepIcon(4)"
            class="text-2xl"
          />
        </div>

        <div class="flex flex-col items-center justify-center">
          <p
            class="font-semibold"
            :class="getStepTextClass(4)"
          >
            Selesai
          </p>

          <p
            class="text-sm"
            :class="currentStep >= 4 ? '' : 'text-gray-400'"
          >
            {{ currentStep >= 4 ? "Selesai" : "Menunggu" }}
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="w-full flex gap-8">
    <!-- DETAIL LAPORAN -->
    <div
      class="w-full bg-white p-10 flex flex-col items-start justify-center gap-8 rounded-xl shadow-sm mt-8"
    >
      <div
        class="w-full flex items-center justify-between pb-4 border-b border-gray-300"
      >
        <div class="flex items-center gap-2">
          <UIcon
            name="i-line-md-file-document"
            class="text-eucalyptus-700 text-2xl"
          />
          <p class="text-xl font-semibold">
            Detail Laporan
          </p>
        </div>

        <div
          class="bg-white-pointer-100 rounded-md px-3 py-1 text-sm text-gray-500 font-semibold"
        >
          ID: {{ data.noTiket }}
        </div>
      </div>

      <p class="text-xl text-black font-semibold col-span-2">
        {{ data.judul }}
      </p>

      <div class="grid grid-cols-2 gap-6">
        <div class="flex flex-col">
          <p class="text-sm">
            Kategori
          </p>

          <p class="text-lg font-medium">
            {{ data.jenis.charAt(0).toUpperCase() + data.jenis.slice(1) }}
          </p>
        </div>

        <div class="flex flex-col">
          <p class="text-sm">
            Tanggal Kejadian
          </p>

          <p class="text-base font-medium">
            {{ formatDate(data.tanggalDibuat) }}
          </p>
        </div>

        <div class="flex flex-col">
          <p class="text-sm">
            Lokasi
          </p>

          <p class="text-lg font-medium">
            <UIcon
              name="i-material-symbols-location-on-outline"
              class="text-eucalyptus-700"
            />
            {{ data.instansi }}
          </p>
        </div>
      </div>

      <div
        class="w-full bg-white-pointer-100 rounded-xl p-4 flex flex-col gap-2"
      >
        <p class="text-sm">
          Deskripsi Aduan
        </p>

        <p class="text-black text-base">
          {{ data.isi }}
        </p>
      </div>
    </div>

    <!-- RIWAYAT STATUS -->
    <div
      class="w-3/5 bg-white p-10 rounded-xl shadow-sm mt-8 border-l-4 border-eucalyptus-700"
    >
      <div class="relative">
        <div class="flex items-center gap-2">
          <UIcon
            name="i-mdi-comment-multiple-outline"
            class="text-eucalyptus-700 text-2xl"
          />
          <p class="text-xl font-semibold">
            Riwayat Status
          </p>
        </div>
      </div>

      <div class="border-l-2 pl-4 border-white-pointer-100 mt-5">
        <div
          v-for="(item, index) in data.statusHistory"
          :key="index"
          class="relative flex flex-col text-sm mb-8"
        >
          <div
            class="absolute -left-6 top-1 rounded-full w-3.5 h-3.5 bg-eucalyptus-700 border-2 border-white"
          />

          <p class="text-eucalyptus-700 font-semibold">
            Sistem GEMA
          </p>

          <p class="mb-2 text-xs">
            {{ formatDate(item.tanggal) }}
          </p>

          <div
            class="bg-white-pointer-100 rounded-xl py-3 px-4 flex flex-col gap-2"
          >
            <p class="font-medium">
              Status: {{ item.statusBaru }}
            </p>

            <p class="text-black text-base">
              {{ item.catatan }}
            </p>
          </div>
        </div>

        <div
          v-if="!data.statusHistory?.length"
          class="text-gray-400 text-sm"
        >
          Belum ada riwayat status.
        </div>
      </div>
    </div>
  </div>
</template>
