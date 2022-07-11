<script setup lang="ts">
import 'gridstack/dist/gridstack.min.css'
import { GridStackWidget } from 'gridstack'
import 'gridstack/dist/h5/gridstack-dd-native'
import { addEvents, useGrid } from '../composables/useGrid'
import { onMounted } from 'vue'

let events = ref([])
let showCalendar = ref(false)
const id = `cal-${Math.floor(Math.random() * 1000)}`

onMounted(() => {
  const grid = useGrid()
  const serializedData: GridStackWidget[] = []

  grid.load(serializedData)
  addEvents(grid, 1)
})

async function handleCredentialResponse(event: MessageEvent) {
  try {
    events.value = event.data ?? throwExpression('No Calendar data')

    if (events.value.length > 0) {
      const grid = useGrid()
      grid.addWidget(
        `<div class="grid-stack-item"><div id="${id}" class="grid-stack-item-content"></div></div>`,
        { w: 3 }
      )
      console.log(events)
      showCalendar.value = true
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
  background-color: beige;
  border: 2px solid;
  border-radius: 5px;
}
</style>

<template>
  <div class="grid-stack">
    <ClientOnly>
      <Teleport v-if="showCalendar" :to="`#${id}`">
        <GoogleCalendar :events="events" />
      </Teleport>
    </ClientOnly>
  </div>
</template>
