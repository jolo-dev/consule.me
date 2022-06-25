<script setup lang="ts">
import 'gridstack/dist/gridstack.min.css'
import { GridStackWidget } from 'gridstack'
import 'gridstack/dist/h5/gridstack-dd-native'
import { addEvents, useGrid } from '../composables/useGrid'
import { onMounted } from 'vue'

onMounted(() => {
  const grid = useGrid()
  const serializedData: GridStackWidget[] = []

  grid.load(serializedData)
  addEvents(grid, 1)
})
</script>

<style>
.grid-stack-item {
  background-color: beige;
  border: 2px solid;
  border-radius: 5px;
}
</style>

<template>
  <div class="grid-stack"></div>
</template>
