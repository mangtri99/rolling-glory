<script setup lang="ts">
import CardProduct from '@/components/CardProduct.vue'
import type { ProductList } from '@/utils/types'
import { useApi } from '@/utils/useApi'
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { Head } from '@unhead/vue/components'
import SimplePagination from '@/components/SimplePagination.vue'

const route = useRoute()
const router = useRouter()

const optionSort = ref([
  {
    label: 'Terbaru',
    value: 'new'
  },
  {
    label: 'Ulasan',
    value: 'rating'
  }
])

const optionFilter = ref([
  {
    label: 'Rating 4 ke atas',
    value: 'rating'
  },
  {
    label: 'Stock Tersedia',
    value: 'stock'
  }
])

const loading = ref(false)
const sort = ref('new')
const products = ref<ProductList>()

const filters = ref<string[]>([])

async function getData() {
  try {
    loading.value = true
    const { data } = await useApi<ProductList>({
      url: `/gifts`,
      params: {
        'page[number]': route.query.page ? route.query.page : 1,
        'page[size]': 6
      }
    })
    products.value = data
    loading.value = false
  } catch (error) {
    loading.value = false
    console.log(error)
  }
}

// get data on mounted
onMounted(async () => {
  await getData()
})

// refecth data when route query change
watch(
  () => route.query.page,
  async () => {
    await getData()
  }
)

const productsFiltered = computed(() => {
  let filtered = products.value?.data

  if (filters.value.includes('rating') && filtered) {
    filtered = filtered.filter((product) => {
      return product.attributes.rating >= 4
    })
  }

  if (filters.value.includes('stock') && filtered) {
    filtered = filtered.filter((product) => {
      return product.attributes.stock > 0
    })
  }

  // sort by
  if (sort.value === 'rating' && filtered) {
    // sort by highest rating
    filtered = filtered.sort((a, b) => {
      return b.attributes.rating - a.attributes.rating
    })
  }
  if (sort.value === 'new' && filtered) {
    filtered = filtered.sort((a, b) => {
      // sort where product has isNew = 1
      if (a.attributes.isNew && b.attributes.isNew) {
        return 0
      } else if (a.attributes.isNew) {
        return -1
      } else if (b.attributes.isNew) {
        return 1
      } else {
        return 0
      }
    })
  }

  return {
    ...products.value,
    data: filtered
  }
})

function paginated(action: string) {
  if (action === 'next' && products.value) {
    router.push({
      path: '/',
      query: {
        page: products.value?.meta.currentPage + 1
      }
    })
  } else if (action === 'prev' && products.value) {
    router.push({
      path: '/',
      query: {
        page: products.value?.meta.currentPage - 1
      }
    })
  }
}
</script>

<template>
  <Head>
    <title>Rolling Glory - Product List</title>
    <meta
      name="description"
      content="Discover the latest smartphone models and find the perfect device for your needs at our online store."
    />
    <meta name="keywords" content="Smartphone, Mobile Phones, Android, iPhone, Mobile Devices" />
    <meta name="og:title" content="Rolling Glory - Product List" />
    <meta
      name="og:description"
      content="Discover the latest smartphone models and find the perfect device for your needs at our online store."
    />
    <meta name="og:image" content="https://rollingglory.com/images/meta_description.png" />
    <meta name="og:url" content="{{ window.location.href }}" />
  </Head>
  <main class="container mx-auto px-4">
    <div class="flex justify-between gap-x-8">
      <div class="w-1/4 lg:block hidden">
        <div>
          <p class="text-gray-950 mb-4 font-bold">Filter</p>
          <hr />
          <div class="border border-secondary-200 p-4 mt-6 rounded-lg">
            <ul class="space-y-4">
              <li v-for="item in optionFilter" :key="item.value">
                <label :for="item.value" class="flex items-center">
                  <span class="flex-1">{{ item.label }}</span>
                  <input
                    :id="item.value"
                    type="checkbox"
                    v-model="filters"
                    :value="item.value"
                    class="form-checkbox"
                  />
                </label>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="lg:w-3/4 w-full">
        <div>
          <div class="mb-4 flex justify-between relative">
            <h1 class="text-gray-950 flex-1 font-bold">Product List</h1>
            <div class="flex items-center gap-x-4 absolute right-0 top-0">
              <p class="text-secondary-300 text-xs">Urutkan</p>
              <select
                class="form-select text-xs pl-8 pr-12 rounded-3xl"
                name="sort"
                id="sort"
                v-model="sort"
              >
                <option v-for="opt in optionSort" :key="opt.value" :value="opt.value">
                  {{ opt.label }}
                </option>
              </select>
            </div>
          </div>
          <hr />
        </div>

        <!-- Filter on Mobile -->
        <div class="text-sm mt-4 lg:hidden block">
          <p class="font-bold text-gray-950 mb-2">Filter:</p>
          <ul class="space-y-2">
            <li v-for="item in optionFilter" :key="item.value">
              <label :for="item.value" class="flex items-center">
                <span class="w-1/3">{{ item.label }}</span>
                <input
                  :id="item.value"
                  type="checkbox"
                  v-model="filters"
                  :value="item.value"
                  class="form-checkbox ml-2"
                />
              </label>
            </li>
          </ul>
        </div>
        <!-- Loading State -->
        <div v-if="loading" class="flex w-full justify-center my-4">
          <p>Loading...</p>
        </div>

        <!-- Product List -->
        <div
          v-else-if="productsFiltered?.data"
          class="grid grid-cols-2 lg:grid-cols-3 sm:grid-cols-2 gap-4 mt-6 mb-8 items-stretch"
        >
          <router-link
            :to="`/detail/${product.id}`"
            v-for="product in productsFiltered?.data"
            :key="product.id"
          >
            <CardProduct :product="product.attributes" />
          </router-link>
        </div>

        <!-- No Product -->
        <div v-else class="flex w-full justify-center my-4">
          <p class="text-xl text-center text-gray-900">Sorry, no products found</p>
        </div>

        <!-- Pagination -->
        <SimplePagination
          v-if="productsFiltered?.meta && productsFiltered?.data"
          :currentPage="productsFiltered?.meta.currentPage"
          :totalPages="productsFiltered?.meta.totalPages"
          @click="(action) => paginated(action)"
        />
      </div>
    </div>
  </main>
</template>
