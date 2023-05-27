import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createHead } from '@vueuse/head'
import routes from '~pages'
import App from '~/App.vue'

import '~/assets/styles.css'
import 'uno.css'

createApp(App)
  .use(createRouter({ routes, history: createWebHistory() }))
  .use(createHead())
  .mount('#root')
