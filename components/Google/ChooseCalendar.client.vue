<script lang="ts" setup>
import { PropType } from 'vue'
import { GoogleCalendarEventsResult } from '~~/composables/google'

const props = defineProps({
  calendars: {
    type: Array as PropType<string[]>
  }
})
const client = useUrqlClient()

async function chooseCalendar(name: string) {
  const accessToken = useAccessToken()
  const now = new Date()
  const [oneWeekBefore, oneWeekAfter] =
    calTimeFromNowOneWeekBeforeAndOneWeekAfter(now)
  const query = `
            {
              googleCalendarEvents(
                calendarId: "${name}"
                idToken : "${accessToken.value}"
                timeMin: "${oneWeekBefore.toISOString()}"
                timeMax: "${oneWeekAfter.toISOString()}"
              ) {
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
  const eventsResult = await client
    .query<GoogleCalendarEventsResult>(query)
    .toPromise()

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

  console.log(events)
  window.opener.postMessage(events, '*')
  window.close()
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
