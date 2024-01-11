<script setup lang="ts">
import type { Attributes } from '@/utils/types'
import BadgeProduct from './BadgeProduct.vue'
import StockStatus from './StockStatus.vue'
import DotIcon from '@/assets/dot.svg'
import ButtonLike from './ButtonLike.vue'
import StarRating from './StarRating.vue'
import { useWishlistStore } from '@/stores/useWishlist'
import { stockStatus } from '@/utils/stockStatus'
import { RouterLink } from 'vue-router'
interface Props {
  product: Attributes
}

const { product } = defineProps<Props>()
const wishlistStore = useWishlistStore()
</script>

<template>
  <div class="border border-secondary-200 rounded-lg py-4 px-2 lg:py-6 lg:px-4 relative h-full">
    <div v-if="product.stock === 0" class="z-10 absolute inset-0 bg-secondary-50/75" />
    <div class="z-10 absolute inset-0 hover:bg-gradient-to-b from-primary to-[#649C1A] hover:opacity-95 transition-all duration-300 group">
      <div class="group-hover:block hidden h-full">
        <div class="flex flex-col h-full text-white py-4 px-2 lg:py-6 lg:px-4 relative w-full">
          <p class="w-full text-sm text-white absolute left-4 top-4">{{ stockStatus(product.stock) }}</p>
          <p class="w-full text-center text-base text-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">{{ product.name }}</p>
          <div class="absolute left-1/2 -translate-x-1/2 bottom-[20%] px-4 w-full">
            <router-link :to="`/detail/${product.id}`" class=" py-2 border border-white hover:bg-white/10 rounded-3xl w-full flex items-center space-x-2 justify-center">
              <span class="i-mdi-visibility"></span>
              <span class="text-xs text-white">View Detail</span>
            </router-link>
          </div>
        </div>
      </div>
    </div> 
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
