<script setup lang="ts">
import CompanyLogo from '@/assets/company-logo.png'
import { RouterLink } from 'vue-router'
</script>
<template>
  <header class="bg-white">
    <div class="py-4">
      <router-link to="/">
        <img class="w-40" :src="CompanyLogo" alt="logo" />
      </router-link>
    </div>
  </header>
</template>
