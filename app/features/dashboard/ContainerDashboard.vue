<script setup lang="ts">
import DashboardTopbar from "~/components/App/DashboardTopbar.vue";
import Chart from "./components/Chart.vue";
import KPI from "./components/KPI.vue";

const { data, status } = await useFetch("/api/v1/dashboard");

const kpis = computed(() => [
  {
    label: "LAPORAN MASUK (HARI INI)",
    total: data.value?.statCard.tiketMasukHariIni,
    icon: "i-mingcute-inbox-fill",
    iconColor: "text-white-pointer-500",
  },
  {
    label: "MENUNGGU VERIFIKASI",
    total: data.value?.statCard.tiketPending,
    icon: "i-mdi-clipboard-clock-outline",
    iconColor: "text-golden-grass-500",
    bgIcon: "bg-golden-grass-100",
  },
  {
    label: "DISELESAIKAN (BULAN INI)",
    total: data.value?.statCard.tiketSelesaiBulanIni,
    icon: "i-material-symbols-check-circle-rounded",
    iconColor: "text-white",
    bgIcon: "bg-primary-300",
    labelColor: "text-primary-300",
    totalColor: "text-white",
    bgCard: "bg-gradient-to-r from-primary-600 to-primary-500",
  },
]);
</script>

<template>
  <main class="w-full bg-[#F8F7FA]">
    <DashboardTopbar
      title="Dashboard"
      description="Ringkasan informasi dan statistik terkait laporan masyarakat."
    />

    <div class="container my-6 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
      <KPI
        v-for="kpi in kpis"
        :key="kpi.label"
        :label="kpi.label"
        :total="kpi.total"
        :icon="kpi.icon"
        :icon-color="kpi.iconColor"
        :bg-icon="kpi.bgIcon"
        :label-color="kpi.labelColor"
        :total-color="kpi.totalColor"
        :bg-card="kpi.bgCard"
        :pending="status === 'pending'"
      />

      <UCard class="md:col-span-3">
        <Chart title="Grafik Total Laporan" :data="data?.graph ?? []" />
      </UCard>
    </div>
  </main>
</template>
