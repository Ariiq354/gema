<script setup lang="ts">
import type { ITiketData } from "../constant";
import { computed } from "vue";

const props = defineProps<{
  data: ITiketData;
}>();

const latestHistory = computed(() => {
  if (!props.data.statusHistory?.[0]?.tanggal) {
    return;
  }

  return formatDate(props.data.statusHistory[0].tanggal);
});

function getStatusDate(status: string) {
  const history = props.data.statusHistory?.find(
    item => item.statusBaru === status,
  );

  return history?.tanggal
    ? formatDate(history.tanggal)
    : null;
}

const verifikasiDate = computed(() => getStatusDate("proses"));
const diprosesDate = computed(() => getStatusDate("selesai"));

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
    class="bg-white p-5 md:p-10 flex flex-col items-center justify-center gap-6 md:gap-8 rounded-xl shadow-sm mt-6 md:mt-8"
  >
    <div class="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div class="flex flex-col gap-1 md:gap-2">
        <p class="text-lg md:text-xl font-semibold">
          Status Penanganan
        </p>

        <p class="text-xs md:text-sm text-gray-500">
          Update terakhir:
          <span class="font-medium text-black">
            {{ latestHistory }}
          </span>
        </p>
      </div>

      <div
        class="rounded-full text-white px-4 py-1.5 flex items-center gap-2 text-xs md:text-sm self-start sm:self-auto"
        :class="props.data.status === 'selesai' ? 'bg-primary-700' : 'bg-golden-grass-500'"
      >
        <UIcon
          name="i-mdi-rotate-3d-variant"
          class="rotate-90 text-base"
        />
        <p class="font-medium">
          {{ statusLabel }}
        </p>
      </div>
    </div>

    <div class="w-full flex flex-col md:flex-row justify-between gap-6 md:gap-4 relative">
      <!-- DIKIRIM -->
      <div class="flex flex-row md:flex-col items-center md:justify-center gap-4 md:gap-3 w-full md:w-1/4">
        <div
          class="flex items-center justify-center rounded-full bg-eucalyptus-700 text-white w-10 h-10 md:w-12 md:h-12 shrink-0 z-10"
        >
          <UIcon
            name="i-material-symbols-check-rounded"
            class="text-xl md:text-2xl"
          />
        </div>

        <div class="flex flex-col items-start md:items-center text-left md:text-center">
          <p class="font-semibold text-sm md:text-base text-black">
            Dikirim
          </p>
          <p class="text-xs md:text-sm text-gray-500">
            {{ formatDate(data.tanggalDibuat) }}
          </p>
        </div>
      </div>

      <!-- DIVERIFIKASI -->
      <div class="flex flex-row md:flex-col items-center md:justify-center gap-4 md:gap-3 w-full md:w-1/4">
        <div
          class="flex items-center justify-center rounded-full w-10 h-10 md:w-12 md:h-12 shrink-0 z-10"
          :class="getStepClass(2)"
        >
          <UIcon
            :name="getStepIcon(2)"
            class="text-xl md:text-2xl"
          />
        </div>

        <div class="flex flex-col items-start md:items-center text-left md:text-center">
          <p
            class="font-semibold text-sm md:text-base"
            :class="getStepTextClass(2)"
          >
            Diverifikasi
          </p>

          <p
            class="text-xs md:text-sm"
            :class="currentStep >= 2 ? 'text-gray-500' : 'text-gray-400'"
          >
            {{
              currentStep < 2
                ? "Menunggu"
                : currentStep === 2
                  ? "Proses"
                  : verifikasiDate
            }}
          </p>
        </div>
      </div>

      <!-- DIPROSES -->
      <div class="flex flex-row md:flex-col items-center md:justify-center gap-4 md:gap-3 w-full md:w-1/4">
        <div
          class="flex items-center justify-center rounded-full w-10 h-10 md:w-12 md:h-12 shrink-0 z-10"
          :class="getStepClass(3)"
        >
          <UIcon
            :name="getStepIcon(3)"
            class="text-xl md:text-2xl"
          />
        </div>

        <div class="flex flex-col items-start md:items-center text-left md:text-center">
          <p
            class="font-semibold text-sm md:text-base"
            :class="getStepTextClass(3)"
          >
            Diproses
          </p>

          <p
            class="text-xs md:text-sm"
            :class="currentStep >= 3 ? 'text-gray-500' : 'text-gray-400'"
          >
            {{
              currentStep < 3
                ? "Menunggu"
                : currentStep === 3
                  ? "Proses"
                  : diprosesDate
            }}
          </p>
        </div>
      </div>

      <!-- SELESAI -->
      <div class="flex flex-row md:flex-col items-center md:justify-center gap-4 md:gap-3 w-full md:w-1/4">
        <div
          class="flex items-center justify-center rounded-full w-10 h-10 md:w-12 md:h-12 shrink-0 z-10"
          :class="getStepClass(4)"
        >
          <UIcon
            :name="getStepIcon(4)"
            class="text-xl md:text-2xl"
          />
        </div>

        <div class="flex flex-col items-start md:items-center text-left md:text-center">
          <p
            class="font-semibold text-sm md:text-base"
            :class="getStepTextClass(4)"
          >
            Selesai
          </p>

          <p
            class="text-xs md:text-sm"
            :class="currentStep >= 4 ? 'text-gray-500' : 'text-gray-400'"
          >
            {{
              currentStep < 4
                ? "Menunggu"
                : diprosesDate
            }}
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- CONTAINER DETAIL & RIWAYAT -->
  <div class="w-full flex flex-col lg:flex-row gap-6 md:gap-8">
    <!-- DETAIL LAPORAN -->
    <div class="w-full lg:w-3/5 bg-white p-5 md:p-10 flex flex-col items-start gap-6 md:gap-8 rounded-xl shadow-sm mt-6 md:mt-8">
      <div class="w-full flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-300 gap-3">
        <div class="flex items-center gap-2">
          <UIcon
            name="i-line-md-file-document"
            class="text-eucalyptus-700 text-xl md:text-2xl"
          />
          <p class="text-lg md:text-xl font-semibold">
            Detail Laporan
          </p>
        </div>

        <div class="bg-white-pointer-100 rounded-md px-3 py-1 text-xs md:text-sm text-gray-500 font-semibold self-start sm:self-auto">
          ID: {{ data.noTiket }}
        </div>
      </div>

      <p class="text-lg md:text-xl text-black font-semibold">
        {{ data.judul }}
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 w-full">
        <div class="flex flex-col">
          <p class="text-xs md:text-sm text-gray-500">
            Kategori
          </p>
          <p class="text-base md:text-lg font-medium text-black">
            {{ data.jenis.charAt(0).toUpperCase() + data.jenis.slice(1) }}
          </p>
        </div>

        <div class="flex flex-col">
          <p class="text-xs md:text-sm text-gray-500">
            Tanggal Kejadian
          </p>
          <p class="text-sm md:text-base font-medium text-black">
            {{ formatDate(data.tanggalDibuat) }}
          </p>
        </div>

        <div v-if="data.instansi" class="flex flex-col sm:col-span-2">
          <p class="text-xs md:text-sm text-gray-500">
            Lokasi
          </p>
          <p class="text-base md:text-lg font-medium text-black flex items-center gap-1">
            <UIcon
              name="i-material-symbols-location-on-outline"
              class="text-eucalyptus-700 shrink-0"
            />
            {{ data.instansi }}
          </p>
        </div>
      </div>

      <div class="w-full bg-white-pointer-100 rounded-xl p-4 flex flex-col gap-2">
        <p class="text-xs md:text-sm text-gray-500">
          Deskripsi Aduan
        </p>
        <p class="text-black text-sm md:text-base whitespace-pre-line">
          {{ data.isi }}
        </p>
      </div>
    </div>

    <!-- RIWAYAT STATUS -->
    <div class="w-full lg:w-2/5 bg-white p-5 md:p-10 rounded-xl shadow-sm mt-6 lg:mt-8 border-l-4 border-eucalyptus-700">
      <div class="relative">
        <div class="flex items-center gap-2">
          <UIcon
            name="i-mdi-comment-multiple-outline"
            class="text-eucalyptus-700 text-xl md:text-2xl"
          />
          <p class="text-lg md:text-xl font-semibold">
            Riwayat Status
          </p>
        </div>
      </div>

      <div class="border-l-2 pl-4 border-white-pointer-100 mt-5 ml-2">
        <div
          v-for="(item, index) in data.statusHistory"
          :key="index"
          class="relative flex flex-col text-sm mb-6 last:mb-0"
        >
          <div
            class="absolute -left-5.75 top-1 rounded-full w-3 h-3 bg-eucalyptus-700 border-2 border-white"
          />

          <p class="text-eucalyptus-700 font-semibold text-xs md:text-sm">
            Admin GEMA
          </p>

          <p class="mb-2 text-[10px] md:text-xs text-gray-500">
            {{ formatDate(item.tanggal as string) }}
          </p>

          <div
            class="bg-white-pointer-100 rounded-xl py-2.5 px-4 flex flex-col gap-1"
          >
            <p class="font-semibold text-xs md:text-sm text-black">
              Status: {{ item.statusBaru }}
            </p>

            <p class="text-gray-700 text-xs md:text-sm">
              {{ item.catatan }}
            </p>
          </div>
        </div>

        <div
          v-if="!data.statusHistory?.length"
          class="text-gray-400 text-xs md:text-sm py-2"
        >
          Belum ada riwayat status.
        </div>
      </div>
    </div>
  </div>
</template>
