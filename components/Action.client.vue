<script lang="ts" setup>
// import { GridStack } from 'gridstack'
import { resolveComponent } from 'vue'
// import { useGrid } from '../composables/useGrid'
// import OauthButtonClient from './Google/OauthButton.client.vue'

// const grid = useGrid()
// let inDashboard = false

const props = defineProps({
  name: String
})

// onMounted(() => {
//   GridStack.setupDragIn('.sidebar .grid-stack-item', {
//     revert: '',
//     scroll: true,
//     appendTo: 'grid-stack',
//     helper: myClone
//   })
// })
let SidebarAction = resolveComponent(props.name!)

// function myClone(event) {
//   grid.on('dropped', (event, previousWidget, newWidget) => {
//     console.log(newWidget)
//     grid.removeWidget(newWidget?.el!)
//     const Foobar = resolveComponent('GoogleOauthButton')
//     console.log(Foobar)

//     grid.addWidget(
//       '<div class="grid-stack-item"><div class="grid-stack-item-content">hello</div></div>',
//       { w: 3 }
//     )
//   })
//   return event.target.clone(true)
// }
</script>

<template>
  <div
    flex
    place-content-center
    bg-transparent
    border-none
    cursor-pointer
    class="grid-stack-item"
  >
    <component :is="SidebarAction"></component>
  </div>
</template>
