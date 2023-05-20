import { createApp } from 'vue'
import { RouterView, createRouter, createWebHistory } from 'vue-router'
import { createHead } from '@vueuse/head'
import routes from '~pages'

import 'uno.css'
import '~/assets/DMMono.css'
import '~/assets/style.scss'

createApp(RouterView)
  .use(createHead())
  .use(createRouter({ routes, history: createWebHistory() }))
  .mount('#root')
