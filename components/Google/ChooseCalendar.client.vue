<script lang="ts" setup>
import { PropType } from 'vue'
import { GoogleCalendarEventsResult } from '~~/composables/google'

const props = defineProps({
  calendars: {
    type: Array as PropType<string[]>
  }
})
const client = useUrqlClient()

function chooseCalendar(name: string) {
  window.postMessage(name)
  console.log(name)
  const accessToken = useAccessToken()
  console.log(accessToken.value)

      const eventsResult = await client
            .query<GoogleCalendarEventsResult>(
              `
            {
              googleCalendarEvents(calendarId: "${name}", idToken : "${accessToken}") {
                items {
                  summary
                  description
                  start {
                    dateTime
                  }
                  end {
                    dateTime
                  }
                }
              }
            }
          `
            )
            .toPromise()
          console.log(eventsResult.data)

          const events = eventsResult.data.googleCalendarEvents.items
            .filter((e) => {
              return e.start !== null
            })
            .map((e) => {
              return {
                start: e.start.dateTime,
                end: e.end.dateTime,
                title: e.summary,
                content: e.description
              }
            })

            console.log(events);

        }
  //   window.close()
}
</script>

<template>
  <div grid place-items-center>
    <div>
      <h2>Choose your Calendar</h2>
      <ul list-none>
        <li v-for="calendar in props.calendars">
          <button
            bg-blue-500
            hover:bg-blue-700
            text-white
            font-bold
            py-2
            px-4
            rounded
            @click="chooseCalendar(calendar)"
          >
            {{ calendar }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
