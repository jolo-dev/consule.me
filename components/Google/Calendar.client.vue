<script lang="ts" setup>
import { useGrid } from '../../composables/useGrid'
import { getGoogleAuthUrl } from '../../composables/google'

const config = useRuntimeConfig()
const clientId = config.googleClientId
const secretId = config.googleClientSecret
const redirectUri = config.redirectUri

const grid = useGrid()
function handleCredentialResponse(response) {
  
  grid.addWidget(
    '<div class="grid-stack-item"><div class="grid-stack-item-content">hello</div></div>',
    { w: 3 }
  )
}

const openPopup = () => {
  window.open(getGoogleAuthUrl({
    clientId,
    secretId,
    redirectUri
  }), '_blank', 'width=600,height=600')
}

</script>

<style>
iframe {
  opacity: 0;
}
</style>

<template>
  <div id="buttonDiv" @click="openPopup" class="i-logos-google-calendar text-3xl"></div>
</template>
