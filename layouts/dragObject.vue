<script lang="ts" setup>
import { GridStack } from 'gridstack'
import { onMounted } from 'vue'
import { useGrid } from '../composables/useGrid'

const grid = useGrid()
let inDashboard = false

onMounted(() => {
  GridStack.setupDragIn('.sidebar .grid-stack-item', {
    revert: 'invalid',
    scroll: true,
    appendTo: 'grid-stack',
    helper: myClone
  })
})

function myClone(event) {
  grid.on('dropped', (event, previousWidget, newWidget) => {
    console.log('dropped')

    inDashboard = true
  })
  return event.target.cloneNode(false)
}
</script>

<template>
  <!-- will size to match content -->
  <div w-35 bg-gray-300 p-2 rounded-xl class="grid-stack-item">
    <div class="grid-stack-item-content">
      <div v-if="inDashboard">
        <slot name="inDashboard" />
      </div>
      <div v-else>
        <slot name="inSidebar" />
      </div>
    </div>
  </div>
</template>
