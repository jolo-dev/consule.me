<script lang="ts" setup>
import { useGrid } from '../../composables/useGrid'
import {
  getGoogleAuthUrl,
  getOauthCode,
  GoogleCalendarResult
} from '../../composables/google'
import { GoogleEvent } from './Calendar.client.vue'
import ChooseCalendarClient from './ChooseCalendar.client.vue'

const config = useRuntimeConfig()
const clientId = config.googleClientId
const secretId = config.googleClientSecret
const redirectUri = config.redirectUri
const scopes = [
  'https://www.googleapis.com/auth/calendar.readonly',
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/calendar.events.readonly',
  'https://www.googleapis.com/auth/calendar.events'
]

const grid = useGrid()
let events: GoogleEvent[]
let calendars = ref<String[]>([])
const accessToken = useAccessToken()
const client = useUrqlClient()

async function handleCredentialResponse(event: MessageEvent) {
  try {
    if (event.origin !== redirectUri) return
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code') ?? ''
    console.log(code)

    if (window.opener) {
      // Exchange Code
      // https://developers.google.com/identity/protocols/oauth2/openid-connect#exchangecode
      const googleCode = await getOauthCode(code, {
        clientId,
        secretId,
        redirectUri
      })
      if (googleCode) {
        const query = `
        {
          googleCalendar(idToken: "${googleCode.access_token}") {
            items {
              id
            }
          }
        }
      `
        const results = await client
          .query<GoogleCalendarResult>(query)
          .toPromise()

        calendars.value = results.data.googleCalendar.items
          // To Remove the Google generated calendar
          .filter((cal) => cal.id.indexOf('v.calendar.google.com') === -1)
          .map((cal) => cal.id)
      }
      accessToken.value = googleCode.access_token
    }
  } catch (error) {
    console.error(error)
  }
}

const openPopup = () => {
  window.open(
    getGoogleAuthUrl({
      clientId,
      secretId,
      redirectUri,
      scopes
    }),
    '_blank',
    'width=600,height=600'
  )
}
window.addEventListener(
  'message',
  async (event) => await handleCredentialResponse(event)
)
</script>

<template>
  <!-- <Calendar v-if="events" :events="events" /> -->
  <Teleport to="body">
    <ChooseCalendarClient v-if="calendars" :calendars="calendars" />
  </Teleport>
  <div
    id="buttonDiv"
    @click="openPopup"
    class="i-logos-google-calendar text-3xl"
  ></div>
</template>
