<template>
  <div id="app">
    <div class="flex flex-col h-screen">
      <main class="flex-1 p-8 overflow-auto">
        <div class="flex justify-between items-center mb-6">
          <div class="flex items-center">
            <h2 class="text-xl font-semibold">Dashboard</h2>
            <div
              v-if="dashboardStore.hasUnsavedChanges"
              class="flex items-center ms-4"
            >
              <small class="text-orange-600">Unsaved changes</small>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <button
              v-if="dashboardStore.hasUnsavedChanges"
              @click="saveChanges"
              class="px-4 py-2 border rounded bg-green-600 text-white"
            >
              Save Changes
            </button>
            <button
              @click="showAddWidget = true"
              class="px-4 py-2 border rounded"
            >
              Add Widget
            </button>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-6">
          <WidgetComponent
            v-for="widget in dashboard.widgets"
            :key="widget.id"
            :widget="widget"
          />
        </div>
      </main>

      <div
        v-if="showAddWidget"
        class="fixed inset-0 bg-black/50 flex items-center justify-center"
      >
        <div class="bg-white rounded-lg p-8 max-w-lg w-11/12 overflow-auto">
          <div class="mb-6">
            <h3 class="text-2xl font-semibold">Add New Widget</h3>
          </div>
          <form @submit.prevent="addWidget">
            <div class="mb-4">
              <label class="block mb-2">Widget Name</label>
              <input
                v-model="newWidget.name"
                class="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter widget name"
                required
              />
            </div>
            <div class="flex gap-4 justify-end mt-10">
              <button
                type="button"
                @click="showAddWidget = false"
                class="px-4 py-2 border rounded-md bg-white text-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 border rounded-md bg-blue-600 text-white"
              >
                Add Widget
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useDashboardStore } from "@/stores/dashboard";
import WidgetComponent from "@/components/WidgetComponent.vue";
import type { Widget } from "@/types";

const dashboardStore = useDashboardStore();

const showAddWidget = ref(false);

const newWidget = ref({
  name: "",
});

const dashboard = computed(() => dashboardStore.dashboard);

function saveChanges() {
  dashboardStore.saveChanges();
}

async function addWidget() {
  const widget: Widget = {
    id: Date.now().toString(),
    name: newWidget.value.name,
    views: [],
  };

  dashboardStore.addWidget(widget);

  newWidget.value = { name: "" };
  showAddWidget.value = false;
}
</script>
