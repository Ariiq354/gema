<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import type { LaporanFormSchema } from "../constant";
import OptionInstansi from "~/components/Option/OptionInstansi.vue";
import { useSubmit } from "~/composables/function";
import { initialFormDataMasukan, masukanSchema, MAX_FILE_SIZE } from "../constant";
import ModalSuksesTiket from "./ModalSuksesTiket.vue";

type MasukanFormSchema = Extract<
  LaporanFormSchema,
  { jenis: "masukan" }
>;

const state = ref(initialFormDataMasukan);

const { data, isLoading, execute } = useSubmit();

async function onSubmit(event: FormSubmitEvent<MasukanFormSchema>) {
  const formDataPayload = event.data;
  isLoading.value = true;

  const bodyFormData = new FormData();
  bodyFormData.append("jenis", formDataPayload.jenis);
  bodyFormData.append("judul", formDataPayload.judul);
  bodyFormData.append("isi", formDataPayload.isi);
  bodyFormData.append("tanggalKejadian", formDataPayload.tanggalKejadian);
  bodyFormData.append("lokasiKejadian", formDataPayload.lokasiKejadian);

  if (formDataPayload.files?.length) {
    for (const file of formDataPayload.files) {
      bodyFormData.append("files", file);
    }
  }

  await execute({
    path: "/api/v1/tiket",
    body: bodyFormData,
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
      :schema="masukanSchema"
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

      <UFileUpload
        v-slot="{ open }"
        v-model="state.files"
        multiple
        :disabled="isLoading"
      >
        <UButton class="w-full sm:w-44 border border-eucalyptus-700 text-eucalyptus-700 bg-white hover:bg-eucalyptus-700 hover:text-white flex items-center justify-center sm:justify-start gap-2 cursor-pointer" @click="open()">
          <UIcon name="i-lucide-link-2" class="-rotate-45" />
          <p>Upload Lampiran</p>
        </UButton>

        <div v-if="state.files?.length" class="mt-4 space-y-2">
          <div
            v-for="(file, index) in state.files"
            :key="index"
            class="border border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-between"
          >
            <template v-if="file.size > MAX_FILE_SIZE">
              <div class="flex items-start gap-3">
                <UIcon name="i-lucide-file-warning" class="size-6 text-error mt-1" />
                <div>
                  <p class="text-sm font-medium">
                    {{ file.name }}
                  </p>
                  <p class="text-error text-xs mt-0.5">
                    Ukuran file tidak boleh lebih dari 10MB
                  </p>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="flex items-start gap-3">
                <UIcon name="i-lucide-file-text" class="size-6 text-gray-500 mt-1" />
                <div>
                  <p class="text-sm font-medium">
                    Nama File: {{ file.name }}
                  </p>
                  <p class="text-xs text-gray-500">
                    Ukuran File: {{ (file.size / 1024).toFixed(2) }} KB
                  </p>
                </div>
              </div>
            </template>

            <!-- tombol X selalu tampil di luar kondisi -->
            <button
              type="button"
              class="cursor-pointer ml-3 shrink-0"
              @click="state.files = state.files?.filter((_, i) => i !== index)"
            >
              <UIcon name="i-lucide-x" class="size-5 text-gray-400 hover:text-gray-600" />
            </button>
          </div>
        </div>
      </UFileUpload>

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
