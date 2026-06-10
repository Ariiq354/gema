<script setup lang="ts">
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { categories } from "../constant";

defineOptions({
  tags: ["areacharts", "singleline"],
});

const props = withDefaults(
  defineProps<{
    showTitle?: boolean;
    data?: {
      month: string;
      total: number;
    }[];
  }>(),
  {
    showTitle: false,
    data: () => [],
  },
);

const chartData = computed(() =>
  props.data.map(item => ({
    ...item,
    month: format(new Date(`${item.month}-01`), "MMM", {
      locale: id,
    }),
  })),
);

function xFormatter(tick: number): string {
  return chartData.value[tick]?.month ?? "";
}
</script>

<template>
  <div
    class="mx-auto space-y-6 rounded-lg bg-white shadow-sm px-10"
    :class="showTitle ? 'p-6' : ''"
  >
    <div
      v-if="showTitle"
      class="flex items-center justify-between"
    >
      <h3 class="text-xl font-semibold">
        Grafik Total Laporan
      </h3>
    </div>

    <AreaChart
      :data="chartData"
      :height="300"
      :categories="categories"
      :y-num-ticks="4"
      :x-num-ticks="chartData.length"
      :y-grid-line="true"
      :legend-position="LegendPosition.TopRight"
      :hide-legend="false"
      :x-formatter="xFormatter"
    />
  </div>
</template>
