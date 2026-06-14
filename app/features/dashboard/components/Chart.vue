<script setup lang="ts">
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { categories } from "../constant";

interface AreaChartData {
  month: string;
  total: number;
}

interface AreaChartProps {
  title: string;
  data: AreaChartData[];
}

const props = defineProps<AreaChartProps>();

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
  <div class="flex flex-col gap-4">
    <p class="text-xl font-bold text-center">
      {{ title }}
    </p>
    <ClientOnly>
      <template #fallback>
        <USkeleton class="h-80 w-full rounded-xl" />
      </template>
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
    </ClientOnly>
  </div>
</template>
