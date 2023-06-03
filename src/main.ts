import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import { createRouter, createWebHistory } from 'vue-router'

import posts from 'virtual:posts'
import createGlobalComponent from '~/components/global'
import App from '~/App.vue'
import Home from '~/pages/Home.vue'

import 'uno.css'
import '~/assets/styles/default.css'
import '~/assets/styles/article.css'
import '~/assets/styles/shiki.css'
import '~/assets/styles/slide-enter.css'
import '~/assets/styles/transition.css'

createApp(App)
  .use(createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', component: Home },
      { path: '/posts', component: () => import('~/pages/Posts.vue') },
      { path: '/post', redirect: '/posts' },
      { path: '/Naoelrie', component: () => import('~/pages/Naoelrie.vue') },
      ...posts,
      { path: '/:pathMatch(.*)*', component: () => import('~/pages/NotFound.vue') },
    ],
  }))
  .use(createGlobalComponent())
  .use(createHead())
  .mount('#root')
