import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import { createRouter, createWebHistory } from 'vue-router'
import App from '~/App.vue'
import Home from '~/pages/Home.vue'

import 'uno.css'
import '~/assets/styles/default.css'
import '~/assets/styles/article.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
  ],
})

createApp(App)
  .use(router)
  .use(createHead())
  .mount('#root')
