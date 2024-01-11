<script setup lang="ts">
import type { Attributes } from '@/utils/types'
import BadgeProduct from './BadgeProduct.vue'
import StockStatus from './StockStatus.vue'
import DotIcon from '@/assets/dot.svg'
import ButtonLike from './ButtonLike.vue'
import StarRating from './StarRating.vue'
import { useWishlistStore } from '@/stores/useWishlist'
interface Props {
  product: Attributes
}

const { product } = defineProps<Props>()
const wishlistStore = useWishlistStore()
</script>

<template>
  <div class="border border-secondary-200 rounded-lg py-4 px-2 lg:py-6 lg:px-4 relative h-full">
    <div v-if="product.stock === 0" class="z-10 absolute inset-0 bg-secondary-50/75" />
    <div class="absolute right-0 top-0 rounded-lg translate-x-[6px] -translate-y-[6px]">
      <BadgeProduct :product="product" />
    </div>
    <StockStatus :stock="product.stock" />
    <div class="my-4">
      <img
        class="w-full px-4 aspect-square object-contain"
        :src="product.images[0]"
        :alt="product.name"
      />
    </div>
    <div class="space-y-2">
      <p class="font-medium">{{ product.name }}</p>
      <div class="flex justify-between items-end lg:gap-x-2">
        <div>
          <div class="flex items-center lg:space-x-2">
            <img :src="DotIcon" alt="" />
            <p class="text-sm text-primary">{{ product.points ?? '0' }} poins</p>
          </div>
          <div class="flex flex-col lg:flex-row lg:items-center lg:space-x-2">
            <StarRating :rating="product.rating" />
            <p class="text-xs text-secondary-300">{{ product.numOfReviews }} reviews</p>
          </div>
        </div>
        <!-- Button Like -->
        <ButtonLike
          @click="
            (e) => {
              wishlistStore.toggleWishlist(product.id)
              e.preventDefault()
            }
          "
          :isLiked="wishlistStore.isWishlist(product.id)"
          classes=" z-20 px-3 py-1 lg:px-3 lg:py-1 rounded-2xl"
        />
      </div>
    </div>
  </div>
</template>
