<script lang="ts" setup>
import { GithubIssueResult } from '~~/composables/github';

const route = useRoute()
const config = useRuntimeConfig()
const client = useUrqlClient()

const code = route.query.code as string
const clientId = config.public.githubClientId
const secretId = config.public.githubClientSecret
const redirectUri = config.public.githubRedirectUri
const githubTokenUri = '/github-auth'
let loading

onMounted(async () => {
  loading = true
  const githubCode = await getOauthCode(
    code,
    {
      clientId,
      secretId,
      redirectUri
    },
    githubTokenUri
  )

  if (githubCode) {
    console.log(githubCode)
    const query = `
        {
          githubIssues(idToken: "${githubCode.access_token}") {
            repository {
              url
              name
            }
            url
            number
            title
            created_at
            state
          }
        }
      `
    const results = await client.query<GithubIssueResult>(query).toPromise()
    window.opener.postMessage({view: 'GithubIssues', events: results.data.githubIssues}, '*')
    window.close()
  }
})
</script>

<template>
  <div flex place-content-center h-screen flex-col justify-center items-center>
    <h1>Fetching..</h1>
    <Loading />
  </div>
</template>
