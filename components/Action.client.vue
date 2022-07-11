<script lang="ts" setup>
import { resolveComponent } from 'vue'
const props = defineProps({
  name: String
})

const SidebarAction = resolveComponent(props.name!)
</script>

<template>
  <div
    flex
    place-content-center
    bg-transparent
    border-none
    cursor-pointer
    p-2
    class="grid-stack-item"
  >
    <component :is="SidebarAction"></component>
  </div>
</template>
