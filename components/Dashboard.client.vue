<script setup lang="ts">
import 'gridstack/dist/gridstack.min.css'
import { GridStackWidget } from 'gridstack'
import 'gridstack/dist/h5/gridstack-dd-native'
import { addEvents, useGrid } from '../composables/useGrid'
import { onMounted, render } from 'vue'

interface ConsuleMeEvent{
  view: string
  events: any[]
}

let events = ref<ConsuleMeEvent>(null)
let showView = ref(false)
let id = ref('')

onMounted(() => {
  const grid = useGrid()
  const serializedData: GridStackWidget[] = []

  grid.load(serializedData)
  addEvents(grid, 1)
})


async function handleCredentialResponse(event: MessageEvent) {
  try {
    events.value = event.data ?? throwExpression('No Event data')
    
    if (events.value.events?.length > 0) {
      id.value = `view-${Math.floor(Math.random() * 1000)}`
      const grid = useGrid()
      grid.addWidget(
        `<div class="grid-stack-item"><div id="${id.value}" class="grid-stack-item-content"></div></div>`,
        { w: 5, h: 3 }
      )
      showView.value = true
    }
  } catch (error) {
    console.error(error)
  }
}

window.addEventListener(
  'message',
  async (event) => await handleCredentialResponse(event),
  false
)
</script>

<style>
.grid-stack-item {
  background-color: white;
  border: 2px solid;
  border-radius: 5px;
}
</style>

<template>
  <div class="grid-stack">
    <ClientOnly>
      <Teleport v-if="showView" :ref="id" :to="`#${id}`">
        <component v-if="showView" :is="events.view" :events="events.events" />
      </Teleport>
    </ClientOnly>
  </div>
</template>
