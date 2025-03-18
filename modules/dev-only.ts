import { defineNuxtModule } from 'nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'dev-only',
  },
  setup(_, nuxt) {
    nuxt.hook('listen', (_, listen) => {
      if (nuxt.options.dev) {
        nuxt.options.appConfig.origin = new URL(listen.url).origin
      }
    })
  },
})
