import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Dashboard, Widget, View } from "@/types";

export const useDashboardStore = defineStore("dashboard", () => {
  const dashboard = ref<Dashboard>({
    widgets: [],
  });

  const hasUnsavedChanges = ref(false);
  const widgets = computed(() => dashboard.value.widgets);

  function markAsChanged() {
    hasUnsavedChanges.value = true;
  }

  function saveChanges() {
    hasUnsavedChanges.value = false;
  }

  function addWidget(widget: Widget) {
    dashboard.value.widgets.push(widget);
    markAsChanged();
  }

  function addViewToWidget(widgetId: string, view: View) {
    const widget = dashboard.value.widgets.find(
      (widget) => widget.id == widgetId
    );
    if (!widget) return;

    widget.views.push(view);
    markAsChanged();
  }

  return {
    dashboard,
    hasUnsavedChanges,
    widgets,
    addWidget,
    addViewToWidget,
    saveChanges,
  };
});
