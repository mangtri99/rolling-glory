<script setup lang="ts">
import FbIcon from '@/assets/fb.svg'
import IgIcon from '@/assets/ig.svg'
import TwIcon from '@/assets/twt.svg'
</script>

<template>
  <footer class="bg-[#232323] px-4">
    <div
      class="container py-8 space-y-4 lg:space-y-0 flex items-center lg:flex-row flex-col justify-between text-white"
    >
      <div class="flex items-center space-x-6">
        <a href="#" class="flex">
          <img :src="IgIcon" alt="Instagram" />
        </a>
        <a href="#" class="flex">
          <img :src="FbIcon" alt="Facebook" />
        </a>
        <a href="#" class="flex">
          <img :src="TwIcon" alt="Twitter" />
        </a>
      </div>
      <div class="flex lg:items-center lg:flex-row flex-col text-sm w-full lg:w-auto">
        <a class="" href="#">Terms & Condition</a>
        <p class="px-6 hidden lg:block">|</p>
        <p>
          Copyright © 2018. All rights reserved.
          <br class="block lg:hidden" />
          PT Radya Gita Bahagi
        </p>
      </div>
    </div>
  </footer>
</template>
