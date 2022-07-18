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

let selectedEvent: GoogleEvent | null = null

export default defineComponent({
  components: { VueCal },
  props: {
    events: {
      type: Object as PropType<GoogleEvent[]>
    }
  },
  data() {
    return {
      selectedEvent,
      showDialog: false
    }
  },
  setup(props) {
    props.events // <-- type: GoogleEvent[]
  },
  methods: {
    onEventClick(event: GoogleEvent, e) {
      this.selectedEvent = event
      this.showDialog = true
      console.log(event)

      // Prevent navigating to narrower view (default vue-cal behavior).
      e.stopPropagation()
    }
  }
})

// `timeCellHeight` is set to 26 in the component data.
function scrollToCurrentTime() {
  const calendar = document.querySelector('#vuecal .vuecal__bg')
  const hours = this.now.getHours() + this.now.getMinutes() / 60
  calendar.scrollTo({ top: hours * this.timeCellHeight, behavior: 'smooth' })
}
function scrollToTop() {
  const calendar = document.querySelector('#vuecal .vuecal__bg')
  calendar.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <VueCal
    small
    active-view="week"
    :events="events"
    :disable-views="['month', 'years', 'year']"
    :time-from="8 * 60"
    :time-to="20 * 60"
    :time-step="60"
    :min-cell-width="100"
    :on-event-click="onEventClick"
    :show-all-day-events="true"
  />
  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <Modal :show="showDialog" @close="showDialog = false">
      <template #header>
        <h2>{{ selectedEvent.title }}</h2>
      </template>
      <template #body>
        <h3>
          {{ new Date(selectedEvent.start).toLocaleString() }} -
          {{ new Date(selectedEvent.end).toLocaleString() }}
        </h3>
        <p>{{ selectedEvent.content }}</p>
      </template>
    </Modal>
  </Teleport>
</template>