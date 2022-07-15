<script setup lang="ts">
import { PropType } from 'vue'
import { GithubIssue } from '~~/composables/github';


const props = defineProps({
  events: {
    type: Object as PropType<GithubIssue[]>
  }
})
</script>

<template>
          <table class="table text-center">
        <thead>
          <tr>
            <th style="width:5%"></th>
            <th flex place-content-center>
              <div class="i-logos-github-icon" />
            </th>
            <th class="text-left">Issue</th>
            <th class="text-left">Repository</th>
            <th class="text-left">State</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(event, i) in props.events">
            <td>{{i + 1}}</td>
            <td><a :href="event.url">#{{event.number}}</a></td>
            <td class="text-left">{{event.title}}</td>
            <td class="text-left"><a :href="event.repository.url">{{event.repository.name}}</a></td>
            <td class="text-left">{{event.state}}</td>
          </tr>
        </tbody>
      </table>
</template>

<style scoped lang="scss">
.table {
  margin-bottom: 0;
  th { border-top: 0; }
  td {
    padding: .5rem;
    &:first-child {
      border-right: 1px solid #dee2e6;
    }
  }
}
</style>