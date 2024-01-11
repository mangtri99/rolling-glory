<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useApi } from '@/utils/useApi'
import { type ProductDetail } from '@/utils/types'
import { onMounted, ref } from 'vue'
import PointIcon from '@/assets/point.svg'
import BadgeProduct from '@/components/BadgeProduct.vue'
import { numberFormat } from '@/utils/numberFormat'
import ButtonLike from '@/components/ButtonLike.vue'
import StockStatus from '@/components/StockStatus.vue'
import { Head } from '@unhead/vue/components'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import StarRating from '@/components/StarRating.vue'
import { useWishlistStore } from '@/stores/useWishlist'

const route = useRoute()
const product = ref<ProductDetail>()
const counter = ref(1)
const wishlistStore = useWishlistStore()

onMounted(async () => {
  try {
    const { data } = await useApi<ProductDetail>({
      url: `/gifts/${route.params.id}`
    })
    product.value = data
  } catch (error) {
    console.log(error)
  }
})

function descriptionList(description: string, extraSpace = false) {
  // split description by new line
  const descriptionList = description.split('\n')
  if (extraSpace) {
    // add extra space between description
    descriptionList.forEach((item, index) => {
      if (index > 0) {
        descriptionList[index] = item + '<br />'
      }
    })
  }

  return descriptionList
}
</script>

<template>
  <Head>
    <title>{{ product?.data.attributes.name ?? 'Product Name' }}</title>
    <meta
      name="description"
      content="{{ product.value?.data.attributes.description ?? 'Product Description' }}"
    />
    <meta name="keywords" content="{{ product.value?.data.attributes.name ?? 'Product Name' }}" />
    <meta name="og:title" content="{{ product.value?.data.attributes.name ?? 'Product Name' }}" />
    <meta
      name="og:description"
      content="{{ product.value?.data.attributes.description ?? 'Product Description' }}"
    />
    <meta name="og:image" content="{{ product.value?.data.attributes.images[0] }}" />
    <meta name="og:url" content="{{ window.location.href }}" />
  </Head>
  <div v-if="product && product.data">
    <div class="container px-4 lg:px-16">
      <div>
        <Breadcrumbs
          :links="[
            {
              url: '/',
              label: 'List Product'
            },
            {
              url: `/detail/${product.data.id}`,
              label: product.data.attributes.name
            }
          ]"
        />
        <div class="my-8">
          <div class="flex flex-col lg:flex-row lg:gap-x-6">
            <div class="lg:w-1/2 w-full">
              <div class="w-full relative flex justify-center">
                <div class="absolute right-0 top-0">
                  <BadgeProduct v-if="product?.data" :product="product?.data.attributes" />
                </div>
                <img
                  class="w-2/3 p-4"
                  :src="product?.data.attributes.images[0]"
                  :alt="product?.data.attributes.name"
                />
              </div>
            </div>
            <div class="lg:w-1/2 w-full">
              <!-- Attributes -->
              <div class="flex flex-col">
                <h1 class="font-bold text-2xl mb-4 text-neutral-800">
                  {{ product?.data.attributes.name }}
                </h1>
                <div class="flex items-center space-x-2">
                  <StarRating :rating="product?.data.attributes.rating" />
                  <p class="text-secondary text-sm">
                    {{ product.data.attributes.numOfReviews }} reviews
                  </p>
                </div>
                <div class="flex items-center space-x-2">
                  <img :src="PointIcon" alt="" />
                  <p class="text-primary text-2xl">
                    {{ numberFormat(product?.data.attributes.points) }} poins
                  </p>
                  <StockStatus :stock="product.data.attributes.stock" />
                </div>
                <!-- Description -->
                <div class="text-sm my-6">
                  <p v-html="descriptionList(product.data.attributes.description)[2]"></p>
                  <p v-html="descriptionList(product.data.attributes.description)[3]"></p>
                  <p v-html="descriptionList(product.data.attributes.description)[4]"></p>
                </div>
                <!-- Qty -->
                <div class="mb-6">
                  <p class="text-sm text-secondary mb-4">Jumlah</p>
                  <div class="flex items-center">
                    <button
                      @click="counter--"
                      type="button"
                      class="px-3 py-2 flex items-center bg-secondary-100 hover:bg-secondary-100/90 shadow-sm rounded-sm"
                    >
                      <span class="i-mdi-minus"></span>
                    </button>
                    <p class="px-3 py-2">{{ counter }}</p>
                    <button
                      @click="counter++"
                      type="button"
                      class="px-3 py-2 flex items-center bg-secondary-100 hover:bg-secondary-100/90 shadow-sm rounded-sm"
                    >
                      <span class="i-mdi-plus"></span>
                    </button>
                  </div>
                </div>
                <!-- Button -->
                <div class="flex items-center lg:space-x-4 space-x-2">
                  <!-- Button Like -->
                  <ButtonLike
                    @click="
                      (e) => {
                        wishlistStore.toggleWishlist(Number(product?.data.id))
                        e.preventDefault()
                      }
                    "
                    :isLiked="wishlistStore.isWishlist(Number(product.data.id))"
                  />
                  <button
                    class="text-sm bg-primary-500 text-white hover:text-primary-500 hover:bg-white border border-primary-500 px-4 py-2 lg:px-6 lg:py-3 rounded-3xl shadow-sm flex items-center transition-all"
                  >
                    Redeem Now
                  </button>
                  <button
                    class="text-sm bg-white text-primary hover:text-white hover:bg-primary border border-primary px-4 py-2 lg:px-6 lg:py-3 rounded-3xl shadow-sm flex items-center transition-all"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-batik">
      <div class="container px-4 lg:px-16">
        <div class="pt-8 lg:pb-16 pb-8">
          <div class="relative">
            <p class="text-primary font-medium mb-3">Info Produk</p>
            <div class="h-[3px] w-32 bg-primary absolute bottom-0 left-0 translate-y-[1px]"></div>
            <hr />
          </div>
          <div>
            <p class="text-xl text-primary-500 my-8">Rincian</p>
            <ul>
              <li
                v-for="(item, index) in descriptionList(product?.data.attributes.description, true)"
                :key="index"
              >
                <div v-html="item"></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="my-4 w-full" v-else>
    <p class="text-center text-xl text-gray-950">No Product Found!</p>
  </div>
</template>
