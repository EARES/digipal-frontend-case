<template>
  <div class="w-full">
    <div class="overflow-x-auto">
      <table class="w-full border-collapse">
        <thead>
          <tr>
            <th class="p-3 border-b border-gray-200 bg-gray-50 font-semibold">
              Symbol
            </th>
            <th class="p-3 border-b border-gray-200 bg-gray-50 font-semibold">
              Price
            </th>
            <th class="p-3 border-b border-gray-200 bg-gray-50 font-semibold">
              Change
            </th>
            <th class="p-3 border-b border-gray-200 bg-gray-50 font-semibold">
              Change %
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in props.data" :key="index">
            <td class="p-3 border-b border-gray-200">
              {{ row.symbol }}
            </td>
            <td class="p-3 border-b border-gray-200">
              {{ row.price }}
            </td>
            <td class="p-3 border-b border-gray-200">
              {{ row.change }}
            </td>
            <td class="p-3 border-b border-gray-200">
              {{ row.changePercent }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  data: any[];
}

const props = defineProps<Props>();
</script>
