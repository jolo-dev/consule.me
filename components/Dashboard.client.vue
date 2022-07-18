<script setup lang="ts">
import 'gridstack/dist/gridstack.min.css'
import { GridStack, GridStackWidget } from 'gridstack'
import 'gridstack/dist/h5/gridstack-dd-native'
import { addEvents, useGrid } from '../composables/useGrid'
import { onMounted } from 'vue'

interface ConsuleMeEvent{
  view: string
  events: any[]
}

let events = ref<ConsuleMeEvent>(null)
let showView = ref(false)
let id = ref('')
let grid: GridStack

onMounted(() => {
  grid = useGrid()
  const serializedData: GridStackWidget[] = []

  grid.load(serializedData)
  addEvents(grid, 1)
})


async function handleCredentialResponse(event: MessageEvent) {
  try {
    events.value = event.data ?? throwExpression('No Event data')
    
    if (events.value.events?.length > 0) {
      
      id.value = `view-${Math.floor(Math.random() * 1000)}`
      grid.addWidget(
        `<div class="grid-stack-item"><div id="${id.value}" class="grid-stack-item-content"></div></div>`,
        { w: 5, h: 3 }
      )
      // setTimeout(() => {
      //   // grid.makeWidget(`#${id.value}`)
      //   const node = document.createElement('div')
      //   node.setAttribute('class','grid-stack-item')
      //   node.innerHTML = `<div id="${id.value}" class="grid-stack-item-content"></div>`
      //   grid.el.appendChild(node);
      //   grid.makeWidget(`#${id.value}`);
      // }, 1000);
      // const allGridItems = grid.getGridItems()
      // console.log(allGridItems);
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
.grid-stack-item-content {
  background-color: white;
  border-radius: 5px;
  padding: 1%;
}
</style>

<template>
  <div class="grid-stack">
    <ClientOnly>
      <!-- <div class="grid-stack-item">
        <div :id="id" class="grid-stack-item-content"></div>
      </div> -->
      <Teleport v-if="showView" :ref="id" :to="`#${id}`">
        <component v-if="showView" :is="events.view" :events="events.events" />
      </Teleport>
    </ClientOnly>
  </div>
</template>
