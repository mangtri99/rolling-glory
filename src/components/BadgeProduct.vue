<script setup lang="ts">
import type { Attributes } from '@/utils/types'
import NewBadge from '@/assets/new.svg'
import BestBadge from '@/assets/best.svg'
import HotBadge from '@/assets/hot.svg'
import { computed } from 'vue'

interface Props {
  product: Attributes
}

const {
  product: { rating, isNew, numOfReviews }
} = defineProps<Props>()

const bestSeller = computed(() => {
  return Math.round(rating) >= 4 && numOfReviews > 25
})
</script>

<template>
  <div v-if="bestSeller && isNew">
    <img :src="HotBadge" alt="hot" />
  </div>
  <div v-else-if="bestSeller">
    <img :src="BestBadge" alt="best" />
  </div>
  <div v-else-if="isNew">
    <img :src="NewBadge" alt="new" />
  </div>
  <div v-else>
    <div></div>
  </div>
</template>
