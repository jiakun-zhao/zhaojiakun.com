import { createApp } from 'vue'
import { RouterView, createRouter, createWebHistory } from 'vue-router'
import { createHead } from '@vueuse/head'
import NProgress from 'nprogress'
import routes from '~pages'
import { vShiki } from '~/utils'
import 'nprogress/nprogress.css'

import 'uno.css'
import '~/assets/index.css'

const router = createRouter({ routes, history: createWebHistory() })
NProgress.configure({ showSpinner: false })
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  next()
})
router.afterEach(() => NProgress.done())

createApp(RouterView)
  .use(router)
  .use(createHead())
  .directive('shiki', vShiki)
  .mount('#root')
