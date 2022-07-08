<script lang="ts">
import { PropType } from 'vue'
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'

export interface GoogleEvent {
  start: string // String in a valid Date format
  end: string // String in a valid Date format
  title: string
  content: string // '<i class="v-icon material-icons">shopping_cart</i>',
  contentFull?: string // can be HTML
  class?: string
}

const id = createUuid()

export default defineComponent({
  components: { VueCal },
  data() {
    return { id }
  },
  props: {
    events: {
      type: Object as PropType<GoogleEvent[]>
    }
  },
  setup(props) {
    props.events // <-- type: GoogleEvent[]
  }
})

// const grid = useGrid()
// grid.makeWidget(`#${id}`)
</script>

<template>
  <div :id="id" class="grid-stack-item">
    <div class="grid-stack-item-content">
      <VueCal
        active-view="week"
        :events="events"
        :disable-views="['month', 'years', 'year']"
        :time-from="8 * 60"
        :time-to="20 * 60"
        :time-step="30"
      />
    </div>
  </div>
</template>
