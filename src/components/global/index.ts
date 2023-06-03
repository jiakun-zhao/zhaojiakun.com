import type { AsyncComponentLoader, Plugin } from 'vue'
import { defineAsyncComponent } from 'vue'

export default function (): Plugin {
  return {
    install(app) {
      const globImport = import.meta.glob('./*.vue')
      Object.entries(globImport).forEach(([path, module]) => {
        const name = path.match(/^\.\/(.+)\.vue$/)?.[1]
        if (name) {
          const component = defineAsyncComponent(module as AsyncComponentLoader)
          app.component(name, component)
        }
      })
    },
  }
}
