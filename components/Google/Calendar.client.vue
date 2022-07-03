<script lang="ts">
import { PropType } from 'vue'
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'

interface Event {
  start: string // String in a valid Date format
  end: string // String in a valid Date format
  title: string
  content: string // '<i class="v-icon material-icons">shopping_cart</i>',
  contentFull?: string // can be HTML
  class: string
}

export default defineComponent({
  components: { VueCal },
  props: {
    events: {
      type: Object as PropType<Event[]>
    }
  },
  setup(props) {
    props.events // <-- type: Event[]
  }
})
</script>

<template>
  <VueCal
    active-view="week"
    :events="events"
    :disable-views="['month', 'years', 'year']"
    :time-from="8 * 60"
    :time-to="20 * 60"
    :time-step="30"
  />
</template>
