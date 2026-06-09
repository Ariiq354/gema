<script lang="ts" setup>
import { FetchError } from "ofetch";
import { useToastError } from "~/composables/toast";

const props = defineProps<{
  path: string;
  refresh: () => void;
}>();

const emit = defineEmits(["close"]);

const loading = ref(false);
const catatan = ref("Laporan Diterima");

async function onClick() {
  loading.value = true;

  try {
    await $fetch(props.path, {
      method: "POST",
      body: {
        catatan: catatan.value,
      },
      credentials: "include",
    });

    useToastSuccess("Success", "Verifikasi Laporan Diterima!");
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
      useToastError("Failed", "Gagal Verifikasi Terima Laporan!");
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
  >
    <template #body>
      <div class="space-y-5">
        <div class="flex flex-col items-center gap-4">
          <UIcon
            name="i-lucide-circle-question-mark"
            size="72"
            class="text-primary"
          />
          <span class="font-semibold text-lg">Verifikasi Terima Laporan?</span>
        </div>

        <div>
          <label class="mb-2 block text-sm font-medium">
            Catatan
          </label>

          <UTextarea
            v-model="catatan"
            :rows="4"
            class="w-full text-red-700"
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
