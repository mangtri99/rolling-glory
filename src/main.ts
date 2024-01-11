import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'
import { createHead } from '@unhead/vue'

const app = createApp(App)

const pinia = createPinia()
const head = createHead()

pinia.use(piniaPluginPersistedstate)

app.use(head)
app.use(pinia)
app.use(router)

app.mount('#app')
