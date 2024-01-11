<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  rating: number
}

const { rating = 0 } = defineProps<Props>()

// round up, e.g. 3.5 -> 4, 3.1 -> 3
const roundedRating = computed(() => Math.round(rating))
const maxRating = ref([1, 2, 3, 4, 5])
</script>

<template>
  <div class="flex items-center">
    <span
      v-for="item in maxRating"
      :key="item"
      :class="[item <= roundedRating ? 'text-gold' : 'text-[#F0F0F0]', 'i-mdi-star text-xs']"
    ></span>
  </div>
</template>
