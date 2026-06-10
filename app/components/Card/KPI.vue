<script setup lang="ts">
const props = withDefaults(defineProps<{
  label: string;
  labelColor?: string;
  total?: string | number;
  totalColor?: string;
  icon?: string;
  iconColor?: string;
  bgIcon?: string;
  bgCard?: string;
}>(), {
  bgIcon: "bg-white-pointer-100",
  iconColor: "text-black",
  bgCard: "bg-white",
});
</script>

<template>
  <div
    class="w-full flex items-start justify-between gap-8 rounded-xl shadow-sm p-6"
    :class="props.bgCard"
  >
    <div class="flex flex-col gap-2">
      <p class="font-medium" :class="props.labelColor">
        {{ props.label }}
      </p>
      <span class="text-5xl font-medium" :class="props.totalColor">
        {{ props.total ?? 0 }}
      </span>
    </div>

    <div
      v-if="props.icon"
      class="h-10 w-10 rounded-full flex items-center justify-center"
      :class="props.bgIcon"
    >
      <UIcon
        :name="props.icon"
        class="text-2xl"
        :class="props.iconColor"
      />
    </div>
  </div>
</template>
