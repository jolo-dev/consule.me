<script lang="ts" setup>
import Calendar from '../components/Google/Calendar.client.vue'
import ChooseCalendar from '../components/Google/ChooseCalendar.client.vue'

const events = [
  {
    start: new Date().toDateString() + ' 10:00',
    end: new Date().toDateString() + ' 14:30',
    title: 'A big thing',
    content: "<i class='v-icon material-icons'>Foo Bar</i>",
    class: 'health'
  }
]

const calendars = ['foo@bar.com', 'bar@baz.test']
</script>

<template>
  <Story group="actions" title="GoogleCalendar">
    <Variant title="Google Calendar">
      <Calendar :events="events" />
    </Variant>
    <Variant title="Choose Google Calendar">
      <ChooseCalendar :calendars="calendars" />
    </Variant>
  </Story>
</template>

<docs lang="md">
# Google Calendar Action

This action is used to display a Google Calendar.
Here you can see all the calendar events.
That Component is defined in `components/Google/Calendar.client.vue`.
Furthermore, it is uses the [`vue-cal`](https://antoniandre.github.io/vue-cal/#api) library.

It takes the following props:

- `events`: an array of events (e.g. below).

```json
[
  {
    "start": "2022-06-27 14:00",
    "end": "2022-06-27 22:00",
    "title": "A big thing",
    "content": "<i class='v-icon material-icons'>sentiment_satisfied_alt</i>",
    "class": "health"
  },
  {
    "start": "2022-06-28 10:00",
    "end": "2022-06-28 15:00",
    "title": "The next big thing",
    "content": "<i class='v-icon material-icons'>sentiment_satisfied_alt</i>",
    "class": "health"
  }
]
```
</docs>
