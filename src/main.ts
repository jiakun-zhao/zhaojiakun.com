import { createApp } from 'vue'
import { RouterView, createRouter, createWebHistory } from 'vue-router'
import { createHead } from '@vueuse/head'
import { inject } from '@vercel/analytics'
import NProgress from 'nprogress'
import { vShiki } from '~/utils'
import routes from '~pages'

import 'uno.css'
import 'nprogress/nprogress.css'
import '~/assets/index.css'

inject()

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
