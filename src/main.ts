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
router.beforeEach((to, from, next) => {
  rootLoad.style.display = 'block'
  if (!import.meta.env.DEV) {
    fetch('https://fun.zhaojiakun.com/api/personal-website/', {
      method: 'HEAD',
      headers: { 'X-To-Path': to.fullPath, 'X-From-Path': from.fullPath },
    }).then().catch()
  }
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
