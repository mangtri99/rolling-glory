<script setup lang="ts">
import { reactive } from 'vue'

interface Props {
  stock: number
}
const { stock = 0 } = defineProps<Props>()
const element = reactive({
  label: 'Sold Out',
  class: 'text-red-600'
})
if (stock < 5 && stock > 0) {
  element.label = 'Stock < 5'
  element.class = 'text-red-500'
} else if (stock > 5) {
  element.label = 'In Stock'
  element.class = 'text-primary-500'
}
</script>

<template>
  <p :class="[element.class, 'font-semibold text-sm']">
    {{ element.label }}
  </p>
</template>
