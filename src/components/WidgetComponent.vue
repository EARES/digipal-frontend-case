<template>
  <div class="bg-white rounded border border-gray-200">
    <div class="p-3 border-b border-gray-200 flex justify-between items-center">
      <div class="flex items-center">
        <h3 class="font-semibold">{{ widget.name }}</h3>
      </div>

      <div class="flex items-center gap-2">
        <select
          v-if="widget.views.length > 0"
          v-model="activeViewId"
          class="px-3 py-2 border border-gray-300 rounded"
        >
          <option v-for="view in widget.views" :key="view.id" :value="view.id">
            {{ view.name }}
          </option>
        </select>
        <button @click="addView" class="px-4 py-2 border rounded">
          Add View
        </button>
      </div>
    </div>

    <TableComponent v-if="activeView" :data="tableData" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useDashboardStore } from "../stores/dashboard";
import TableComponent from "./TableComponent.vue";
import stockDataJson from "../data/stockData.json";
import techStocksJson from "../data/techStocks.json";
import financeStocksJson from "../data/financeStocks.json";
import energyStocksJson from "../data/energyStocks.json";
import type { Widget, View } from "@/types";

interface Props {
  widget: Widget;
}

const props = defineProps<Props>();

const dashboardStore = useDashboardStore();

const activeViewId = ref<string | null>();

const activeView = computed(() =>
  props.widget.views.find((view) => view.id == activeViewId.value)
);

const tableData = computed(() => {
  if (!activeView.value) return stockDataJson;

  const dataSource = activeView.value.dataSource;

  switch (dataSource) {
    case "tech":
      return techStocksJson;
    case "finance":
      return financeStocksJson;
    case "energy":
      return energyStocksJson;
    case "stocks":
    default:
      return stockDataJson;
  }
});

function addView() {
  const dataSources = ["stocks", "tech", "finance", "energy"];
  const viewNames = [
    "Stock Overview",
    "Tech Stocks",
    "Finance Sector",
    "Energy Sector",
    "Market Analysis",
    "Portfolio View",
    "Trading Dashboard",
    "Investment Tracker",
  ];

  const randomIndex1 = Math.floor(Math.random() * dataSources.length);
  const randomIndex2 = Math.floor(Math.random() * viewNames.length);

  const randomDataSource = dataSources[randomIndex1] as string;
  const randomName = viewNames[randomIndex2] as string;

  const view: View = {
    id: Date.now().toString(),
    name: randomName,
    dataSource: randomDataSource,
  };

  dashboardStore.addViewToWidget(props.widget.id, view);

  activeViewId.value = view.id;
}
</script>
