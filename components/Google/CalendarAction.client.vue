<script lang="ts" setup>
import { getGoogleAuthUrl } from '../../composables/google'

const config = useRuntimeConfig()
const clientId = config.googleClientId
const secretId = config.googleClientSecret
const redirectUri = config.googleRedirectUri
const scopes = [
  'https://www.googleapis.com/auth/calendar.readonly',
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/calendar.events.readonly',
  'https://www.googleapis.com/auth/calendar.events'
]

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
</script>

<template>
  <div @click="openPopup" class="i-logos-google-calendar text-3xl"></div>
</template>
