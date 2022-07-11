<script lang="ts" setup>
const route = useRoute()
const config = useRuntimeConfig()

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
  }
})
</script>

<template>
  <h1>Welcome To Github</h1>
</template>
