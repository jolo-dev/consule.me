<script lang="ts" setup>
import { getOauthCode, GoogleCalendarResult } from '../composables/google'
import ChooseCalendar from '../components/Google/ChooseCalendar.client.vue'
import Loading from '../components/Loading.vue'
const route = useRoute()
const accessToken = useAccessToken()
const config = useRuntimeConfig()
const client = useUrqlClient()

const code = route.query.code as string
const clientId = config.googleClientId
const secretId = config.googleClientSecret
const redirectUri = config.redirectUri
let calendars = ref<string[]>()
let loading

onMounted(async () => {
  loading = true
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

    const results = await client.query<GoogleCalendarResult>(query).toPromise()

    calendars.value = results.data.googleCalendar.items
      // To Remove the Google generated calendar
      .filter((cal) => cal.id.indexOf('v.calendar.google.com') === -1)
      .map((cal) => cal.id)

    accessToken.value = googleCode.access_token
  }
  loading = false
})
</script>

<template>
  <div>
    <ClientOnly>
      <div v-if="loading" place-content-center flex>
        <Loading></Loading>
      </div>
    </ClientOnly>
    <ChooseCalendar v-if="calendars" :calendars="calendars" />
  </div>
</template>
