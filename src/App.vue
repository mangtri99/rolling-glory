<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import TheFooter from './components/TheFooter.vue'
import TheHeader from './components/TheHeader.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <TheHeader />
    <div class="flex-1">
      <RouterView />
    </div>
    <TheFooter />
  </div>
</template>
