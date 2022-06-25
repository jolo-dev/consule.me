<script lang="ts" setup>
import { onMounted } from 'vue'
// import { requestUsersAccess } from '../composables/googleAuth'
import { gapi, loadAuth2WithProps } from 'gapi-script'
// const config = useRuntimeConfig()

const client_id = process.env.NUXT_GOOGLE_CLIENT_ID || ''

const redirect_uri = 'http://localhost:3000'

const auth2 = async () => {
  const auth = await loadAuth2WithProps(gapi, {
    client_id,
    scope: 'https://www.googleapis.com/auth/calendar',
    immediate: true,
    cookie_policy: 'single_host_origin',
    redirect_uri
  })
  return auth
}
onMounted(async () => {
  const auth = await auth2()
  if (auth.isSignedIn.get()) {
    console.log('signed in')
  } else {
    auth.attachClickHandler('signIn', {}, (googleUser) => {})
  }
})
</script>

<template>
  <div id="signIn">
    <img
      w-50
      cursor-pointer
      src="~/assets/img/google-signin.png"
      alt="Sign In with Google"
    />
  </div>
</template>
