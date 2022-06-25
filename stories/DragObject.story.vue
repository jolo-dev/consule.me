<script lang="ts" setup>
import NuxtLayout from 'nuxt'
import GoogleOauthButtonClient from '../components/Google/GoogleOauthButton.client.vue'
</script>

<template>
  <Story group="layout">
    <NuxtLayout name="drag-object">
      <template #inDashboard>
        <GoogleOauthButtonClient />
      </template>
    </NuxtLayout>
  </Story>
</template>
