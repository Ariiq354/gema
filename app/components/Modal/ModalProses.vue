<script lang="ts" setup>
import { FetchError } from "ofetch";
import { useToastError } from "~/composables/toast";

const props = defineProps<{
  path: string;
  refresh: () => void;
}>();

const emit = defineEmits(["close"]);

const loading = ref(false);
const isiRespon = ref("");
const dibuatOleh = ref("");

async function onClick() {
  loading.value = true;

  try {
    await $fetch(props.path, {
      method: "POST",
      body: {
        isiRespon: isiRespon.value || "Laporan Sudah Kami Tindak Lanjut ke Instansi Terkait, Terima kasih.",
        dibuatOleh: dibuatOleh.value || "Sistem Gema",
      },
      credentials: "include",
    });

    useToastSuccess("Success", "Proses Balasan Laporan Berhasil Dikirim!");
    props.refresh();
    emit("close", false);
  }
  catch (error) {
    if (error instanceof FetchError) {
      useToastError(
        "Failed",
        error.data?.message || "Terjadi kesalahan",
      );
    }
    else {
      useToastError("Failed", "Gagal Proses Laporan!");
    }
  }
  finally {
    loading.value = false;
  }
}
</script>

<template>
  <UModal
    :ui="{ body: 'sm:max-w-lg' }"
    title="Proses Laporan"
  >
    <template #body>
      <div class="space-y-5">
        <div class="space-y-5">
          <label class="mb-2 block text-sm font-medium">
            Catatan
          </label>
          <UTextarea
            v-model="isiRespon"
            :rows="8"
            placeholder="Laporan Sudah Kami Tindak Lanjut ke Instansi Terkait, Terima kasih."
            class="w-full"
          />

          <label class="mb-2 block text-sm font-medium">
            Nama Petugas
          </label>
          <UInput
            v-model="dibuatOleh"
            placeholder="Sistem Gema"
            class="w-full"
          />
        </div>
      </div>
    </template>

    <template #footer>
      <UButton
        icon="i-lucide-x"
        :disabled="loading"
        variant="ghost"
        class="text-base"
        @click="emit('close', false)"
      >
        Tidak
      </UButton>

      <UButton
        icon="i-lucide-check"
        :loading="loading"
        color="success"
        class="text-base"
        @click="onClick"
      >
        Ya
      </UButton>
    </template>
  </UModal>
</template>
