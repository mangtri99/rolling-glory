<script setup lang="ts">
import { RouterLink } from 'vue-router'
type Link = {
  url: string
  label: string
}

interface Props {
  links: Link[]
}

const { links = [] } = defineProps<Props>()
</script>

<template>
  <div>
    <ul class="flex space-x-2">
      <li v-for="(link, index) in links" :key="link.url">
        <router-link :to="link.url">
          {{ link.label }}
        </router-link>
        <span v-if="index < links.length - 1"> > </span>
      </li>
    </ul>
  </div>
</template>
