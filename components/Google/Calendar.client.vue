<script lang="ts" setup>
import { useGrid } from '../../composables/useGrid'
import { getGoogleAuthUrl, getOauthCode } from '../../composables/google'

const config = useRuntimeConfig()
const clientId = config.googleClientId
const secretId = config.googleClientSecret
const redirectUri = config.redirectUri

const grid = useGrid()

async function handleCredentialResponse(event) {
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
      console.log(googleCode)
      window.opener.postMessage(googleCode)
      console.log('sending to opener')
      // close the popup
      window.close()
    }

    grid.addWidget(
      '<div class="grid-stack-item"><div class="grid-stack-item-content">hello</div></div>',
      { w: 3 }
    )
    console.log(code)
  } catch (error) {
    console.error(error)
  }
}

const openPopup = () => {
  window.open(
    getGoogleAuthUrl({
      clientId,
      secretId,
      redirectUri
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
