<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import type { LaporanFormSchema } from "../constant";
import OptionInstansi from "~/components/Option/OptionInstansi.vue";
import { useSubmit } from "~/composables/function";
import { initialFormDataPengaduan, pengaduanSchema } from "../constant";
import ModalSuksesTiket from "./ModalSuksesTiket.vue";

type PengaduanFormSchema = Extract<
  LaporanFormSchema,
  { jenis: "pengaduan" }
>;

const state = reactive({ ...initialFormDataPengaduan });

const { data, isLoading, execute } = useSubmit();

async function onSubmit(event: FormSubmitEvent<PengaduanFormSchema>) {
  isLoading.value = true;

  await execute({
    path: "/api/v1/tiket",
    body: event.data,
    method: "POST",
    onSuccess() {
      if (data.value) {
        const noTiket = data.value.noTiket;
        openModal(ModalSuksesTiket, { noTiket });
      }
    },
    onError(error) {
      useToastError("Submit Failed", error.data.message);
    },
  });
}
</script>

<template>
  <div class="space-y-6">
    <UForm
      :schema="pengaduanSchema"
      :state="state"
      class="space-y-6"
      @submit="onSubmit"
    >
      <UFormField label="Judul Laporan" name="judul">
        <UInput
          v-model="state.judul"
          placeholder="Masukkan Judul Laporan Anda"
          :disabled="isLoading"
        />
      </UFormField>

      <UFormField label="Isi Laporan" name="isi">
        <UTextarea
          v-model="state.isi"
          placeholder="Masukkan Isi Laporan Anda"
          :disabled="isLoading"
        />
      </UFormField>

      <UFormField label="Tanggal Kejadian" name="tanggalKejadian">
        <UInput
          v-model="state.tanggalKejadian"
          type="date"
          :disabled="isLoading"
        />
      </UFormField>

      <UFormField
        label="Instansi Tujuan"
        name="idInstansi"
      >
        <OptionInstansi v-model="state.idInstansi" />
      </UFormField>

      <UFormField label="Lokasi Kejadian" name="lokasiKejadian">
        <UInput
          v-model="state.lokasiKejadian"
          placeholder="Masukkan Lokasi Kejadian"
          :disabled="isLoading"
        />
      </UFormField>

      <UButton
        class="w-full bg-eucalyptus-600 hover:bg-eucalyptus-700 text-white text-base flex justify-center py-3 rounded-lg font-semibold cursor-pointer"
        type="submit"
        :disabled="isLoading"
        :loading="isLoading"
      >
        Kirim
      </UButton>
    </UForm>
  </div>
</template>
