<script lang="ts" setup>
import { getGithubAuthUrl } from '../../composables/github'

const config = useRuntimeConfig()
const clientId = config.public.githubClientId
const secretId = config.public.githubClientSecret
const redirectUri = config.public.githubRedirectUri
const scopes = ['repo']

const openPopup = () => {
  window.open(
    getGithubAuthUrl({
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
  <div @click="openPopup" class="i-logos-github-icon text-3xl"></div>
</template>
