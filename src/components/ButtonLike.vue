<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
interface Props {
  isLiked: boolean
  classes?: string
  iconClasses?: string
}

const { isLiked = false, classes = '', iconClasses = '' } = defineProps<Props>()
const emit = defineEmits(['click'])
</script>

<template>
  <button
    @click="$emit('click', $event)"
    :class="[
      isLiked ? 'bg-red-600 border border-red-600' : ' border border-[#E1E1E1]',
      twMerge(
        ' hover:bg-red-600 px-4 py-2 lg:px-6 lg:py-3 rounded-3xl shadow-sm flex items-center transition-all group',
        classes
      )
    ]"
  >
    <span
      :class="[
        isLiked ? 'i-mdi-heart' : 'i-mdi-heart-outline',
        twMerge(
          'group-hover:i-mdi-heart text-[#E1E1E1] group-hover:text-white text-xl',
          iconClasses
        )
      ]"
    ></span>
  </button>
</template>
