<script lang="ts" setup>
import GoogleCalendarDrag from '../components/Google/GoogleCalendarDrag.client.vue'
import GoogleOauthButton from '../components/Google/GoogleOauthButton.client.vue'
import 'uno.css'
</script>

<template>
  <Story group="dragndrop" title="GoogleCalendar">
    <Variant title="Google Calendar DragObject">
      <GoogleCalendarDrag />
    </Variant>
    <Variant title="Google Sign In Button">
      <GoogleOauthButton />
    </Variant>
  </Story>
</template>
