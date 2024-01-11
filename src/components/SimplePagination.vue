<script setup lang="ts">
interface Props {
  currentPage: number
  totalPages: number
}

const { currentPage, totalPages } = defineProps<Props>()

const emit = defineEmits<{
  click: [value: string]
}>()
</script>

<template>
  <div class="flex justify-between items-center mb-8">
    <button
      class="rounded-sm border border-gray-900 text-gray-900 px-4 py-2 bg-white hover:bg-gray-50 text-sm disabled:cursor-not-allowed disabled:bg-gray-200"
      @click="$emit('click', 'prev')"
      :disabled="currentPage === 1"
    >
      Previous
    </button>

    <button
      class="rounded-sm border border-gray-900 text-gray-900 px-4 py-2 bg-white hover:bg-gray-50 text-sm disabled:cursor-not-allowed disabled:bg-gray-200"
      @click="$emit('click', 'next')"
      :disabled="totalPages === currentPage"
    >
      Next
    </button>
  </div>
</template>
