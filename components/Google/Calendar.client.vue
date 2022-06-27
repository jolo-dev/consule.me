<script lang="ts" setup>
import { onMounted } from 'vue'
import { createUuid } from '../../composables/createUuid'
import { decodeJwt } from '../../composables/decodeJwt'
import { useGrid } from '../../composables/useGrid'

const config = useRuntimeConfig()
const client_id = config.googleClientId || ''
const redirect_uri = config.redirectUri || ''

const grid = useGrid()
let show = false
// OpenID Connect Step 1: User Login
onMounted(() => {
  // Returns the google object below
  useHead({
    script: [
      {
        src: 'https://accounts.google.com/gsi/client',
        defer: true,
        async: true,
        callback: () => {
          console.log('Loading finished')
        }
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
  }, 50)
})

const buttonClick = () => {
  window.open('https://google.com', '_blank', 'width=600,height=600')
}

function handleCredentialResponse(response) {
  const { email, sub } = decodeJwt(response.credential)
  // OpenID Connect Step 2: Send an authentication request to Google
  // https://developers.google.com/identity/protocols/oauth2/openid-connect#sendauthrequest
  const { data: token } = useLazyAsyncData('token', () =>
    $fetch('https://accounts.google.com/o/oauth2/v2/auth', {
      // Overview what is needed
      // https://developers.google.com/identity/protocols/oauth2/openid-connect#state-param
      params: {
        client_id,
        response_type: 'code',
        scope: 'openid email',
        redirect_uri,
        nonce: createUuid(),
        login_hint: email
      },
      headers: {
        'Content-Type': 'application/json'
      }
    })
  )
  console.log(token)

  grid.addWidget(
    '<div class="grid-stack-item"><div class="grid-stack-item-content">hello</div></div>',
    { w: 3 }
  )
}
</script>

<style>
iframe {
  opacity: 0;
}
</style>

<template>
  <div id="buttonDiv" class="i-logos-google-calendar text-3xl"></div>
</template>
