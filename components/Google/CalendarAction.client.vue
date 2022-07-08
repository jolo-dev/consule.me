<script lang="ts" setup>
import { getGoogleAuthUrl } from '../../composables/google'

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
let events = []

async function handleCredentialResponse(event: MessageEvent) {
  try {
    events = event.data ?? throwExpression('No Calendar data')
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
    'message',
    'width=600,height=600'
  )
}
window.addEventListener(
  'message',
  async (event) => await handleCredentialResponse(event),
  false
)
</script>

<template>
  <!-- <GoogleCalendar v-if="events" :events="events" /> -->
  <div
    id="buttonDiv"
    @click="openPopup"
    class="i-logos-google-calendar text-3xl"
  ></div>
</template>
