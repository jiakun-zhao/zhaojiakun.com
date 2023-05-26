import { createApp } from 'vue'
import { RouterView, createRouter, createWebHistory } from 'vue-router'
import { createHead } from '@vueuse/head'
import { vImageFigure, vShiki } from '~/utils'
import routes from '~pages'
import NeteaseMusicCard from '~/components/NeteaseMusicCard.vue'

import '~/assets/styles.css'
import 'uno.css'

const root_load = document.querySelector('#root_load') as HTMLDivElement

const router = createRouter({ routes, history: createWebHistory() })
router.beforeEach((to, from, next) => {
  root_load.style.display = 'block'
  next()
})
router.afterEach(() => {
  root_load.style.display = 'none'
})

createApp(RouterView)
  .use(router)
  .use(createHead())
  .component('NeteaseMusicCard', NeteaseMusicCard)
  .directive('shiki', vShiki)
  .directive('image-figure', vImageFigure)
  .mount('#root')
