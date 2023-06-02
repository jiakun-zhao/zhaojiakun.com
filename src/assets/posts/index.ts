import { lazy } from 'solid-js'
import type { MetaProps } from '~/types'

interface Post {
  description: string
  date: string
  path: `/${string}`
  component: ReturnType<typeof lazy>
  draft?: boolean
  music?: number
}

const posts: (MetaProps & Post)[] = [
  {
    title: 'Hello World',
    description: '关于这个网站的一些说明和`你好，世界！`',
    date: '2023-04-07 01:53:00',
    path: '/hello-world',
    component: lazy(() => import('./hello-world.md')),
  },
  {
    title: '社恐人的一大步...',
    description: '记第一次去咖啡店写代码~',
    date: '2023-05-04 10:15:00',
    path: '/a-big-step-for-me',
    component: lazy(() => import('./a-big-step-for-me.md')),
  },
  {
    title: '0x00',
    description: '大火之后，我知道那是我的家，但是回不去了。',
    date: '2023-05-23 23:08:41',
    music: 31517167,
    path: '/after-the-fire',
    component: lazy(() => import('./after-the-fire.md')),
  },
  {
    title: '记：Vite + Solid + MDX',
    description: '在 Vite + Solid 中使用 MDX，主要是环境搭建。',
    date: '2023-05-30 22:58:12',
    music: 31517167,
    path: '/i-mdx-solid-vite',
    component: lazy(() => import('./i-mdx-solid-vite.md')),
  },
  {
    title: 'JavaScript Snippets',
    description: '记录一些 JavaScript 的代码片段与小技巧',
    date: '2023-05-30 12:07:03',
    draft: true,
    path: '/javascript-snippets',
    component: lazy(() => import('./javascript-snippets.md')),
  },
  {
    title: '平淡日子里的刺 by Naoelrie',
    description: '夏天到啦~',
    date: '2023-04-25 21:15:00',
    path: '/Naoelrie-TxYC3Dc5zUtMhJA-pHuSA',
    component: lazy(() => import('./Naoelrie-TxYC3Dc5zUtMhJA-pHuSA.md')),
  },
  {
    title: 'Naoelrie',
    description: 'My best friend.',
    date: '2023-04-25 21:15:00',
    path: '/Naoelrie',
    component: lazy(() => import('./Naoelrie.md')),
  },
  {
    title: 'Personal website favorites',
    description: 'A list of personal websites that I like.',
    date: '2023-04-16 15:46:00',
    draft: true,
    path: '/personal-website-favorites',
    component: lazy(() => import('./personal-website-favorites.md')),
  },
  {
    title: '莘野起始页',
    description: '一个极简的起始页项目。',
    date: '2023-04-20 19:19:00',
    path: '/start-page',
    component: lazy(() => import('./start-page.md')),
  },
]

export default posts
