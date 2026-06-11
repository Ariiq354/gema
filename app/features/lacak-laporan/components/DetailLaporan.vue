<script setup lang="ts">
interface DetailLaporan {
  noTiket: string;
  judul: string;
  isi: string;
  jenis: string;
  tanggal: string;
  instansi: string | null;
}

const { data } = defineProps<{
  data: DetailLaporan;
}>();
</script>

<template>
  <div class="w-full bg-white p-10 flex flex-col items-start gap-8 rounded-xl shadow-sm mt-8">
    <div class="w-full flex items-center justify-between pb-4 border-b border-gray-300">
      <div class="flex items-center gap-2">
        <UIcon
          name="i-line-md-file-document"
          class="text-eucalyptus-700 text-2xl"
        />
        <p class="text-xl font-semibold">
          Detail Laporan
        </p>
      </div>

      <div class="bg-white-pointer-100 rounded-md px-3 py-1 text-sm text-gray-500 font-semibold">
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
          {{ data.tanggal }}
        </p>
      </div>

      <div v-if="data.instansi" class="flex flex-col">
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

    <div class="w-full flex-1 bg-white-pointer-100 rounded-xl p-4 flex flex-col gap-2">
      <p class="text-sm">
        Deskripsi Aduan
      </p>

      <p class="text-black text-base">
        {{ data.isi }}
      </p>
    </div>
  </div>
</template>
