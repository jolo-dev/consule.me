<script lang="ts" setup>
import { useGrid } from '../../composables/useGrid'
import { getGoogleAuthUrl, getOauthCode } from '../../composables/google'

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

async function handleCredentialResponse(event: MessageEvent) {
  try {
    if (event.origin !== redirectUri) return
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code') ?? ''
    if (window.opener) {
      // Exchange Code
      // https://developers.google.com/identity/protocols/oauth2/openid-connect#exchangecode
      const googleCode = await getOauthCode(code, {
        clientId,
        secretId,
        redirectUri
      })
      window.opener.postMessage(googleCode)
      // close the popup
      window.close()
    }
    let accessToken = event.data['access_token']
    accessToken
      ? grid.addWidget(
          '<div class="grid-stack-item"><div class="grid-stack-item-content"></div></div>',
          { w: 3 }
        )
      : ''
    console.log(accessToken)
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

<style>
iframe {
  opacity: 0;
}
</style>

<template>
  <div
    id="buttonDiv"
    @click="openPopup"
    class="i-logos-google-calendar text-3xl"
  ></div>
</template>
