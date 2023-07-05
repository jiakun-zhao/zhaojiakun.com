import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'

import routes from '~pages'
import App from '~/App.vue'

import 'uno.css'
import 'nprogress/nprogress.css'
import '~/assets/styles.scss'

const router = createRouter({ routes, history: createWebHistory() })
NProgress.configure({ showSpinner: false }) // 禁⽤右侧进度环
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})
router.afterEach(() => NProgress.done())

createApp(App)
  .use(router)
  .use(createHead())
  .mount('#root')
