import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import { createRouter, createWebHistory } from 'vue-router'

import posts from 'virtual:posts'
import App from '~/App.vue'
import Home from '~/pages/Home.vue'

import 'uno.css'
import '~/assets/styles/default.css'
import '~/assets/styles/article.css'

console.log(posts)

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/:pathMatch(.*)*', component: Home },
    { path: '/posts', component: () => import('~/pages/Posts.vue') },
    { path: '/post', redirect: '/posts' },
    ...posts,
    // { path: '/post/test', meta: {}, component: () => import('~/pages/TestPost.vue') },
  ],
})

createApp(App)
  .use(router)
  .use(createHead())
  .mount('#root')
