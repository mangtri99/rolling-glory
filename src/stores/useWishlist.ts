import { defineStore } from 'pinia'

export const useWishlistStore = defineStore('wishlistStore', {
  state: () => {
    return {
      data: [] as number[]
    }
  },
  actions: {
    toggleWishlist(productId: number) {
      if (this.data.includes(productId)) {
        this.data = this.data.filter((id) => id !== productId)
      } else {
        this.data.push(productId)
      }
    }
  },
  getters: {
    isWishlist: (state) => (productId: number) => {
      return state.data.includes(productId)
    }
  },
  persist: true
})
