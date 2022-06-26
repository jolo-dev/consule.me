<script lang="ts" setup>
import { onMounted } from 'vue'
import { useGrid } from '../../composables/useGrid'
const config = useRuntimeConfig()

const client_id = config.googleClientId || ''

const grid = useGrid()
onMounted(() => {
  // Returns the google object below
  useHead({
    script: [
      {
        src: 'https://accounts.google.com/gsi/client',
        defer: true,
        async: true
      }
    ]
  })
  setTimeout(() => {
    google.accounts.id.initialize({
      client_id,
      callback: handleCredentialResponse
    })
    google.accounts.id.renderButton(
      document.getElementById('buttonDiv'),
      { theme: 'outline', size: 'large', shape: 'square', type: 'icon' } // customization attributes
    )
    google.accounts.id.prompt() // also display the One Tap dialog
  }, 1000)
})
function handleCredentialResponse(response) {
  // decodeJwtResponse() is a custom function defined by you
  // to decode the credential response.
  console.log(response.credential)
}
</script>

<style>
iframe {
  opacity: 0;
}
</style>

<template>
  <!-- <div
    id="g_id_onload"
    :data-client_id="client_id"
    data-context="signin"
    data-ux_mode="popup"
    :data-callback="handleCredentialResponse"
    data-auto_prompt="false"
  ></div>

  <div
    class="g_id_signin i-logos-google-calendar text-3xl"
    data-type="icon"
    data-shape="square"
    data-theme="outline"
    data-size="large"
  ></div> -->
  <div id="buttonDiv" class="i-logos-google-calendar text-3xl"></div>
</template>
