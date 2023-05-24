import { createApp } from 'vue'
import { RouterView, createRouter, createWebHistory } from 'vue-router'
import { createHead } from '@vueuse/head'
import { vImageFigure, vShiki } from '~/utils'
import routes from '~pages'
import NeteaseMusicCard from '~/components/NeteaseMusicCard.vue'

import 'uno.css'
import '~/assets/index.css'

const rootLoad = document.querySelector('#root_load') as HTMLDivElement

const router = createRouter({ routes, history: createWebHistory() })
router.beforeEach(async (to, from, next) => {
  rootLoad.style.display = 'block'
  next()
})
router.afterEach(() => rootLoad.style.display = 'none')

createApp(RouterView)
  .use(router)
  .use(createHead())
  .component('NeteaseMusicCard', NeteaseMusicCard)
  .directive('shiki', vShiki)
  .directive('image-figure', vImageFigure)
  .mount('#root')
