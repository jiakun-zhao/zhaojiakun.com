import { readFile } from 'node:fs/promises'
import { isUndefined, notUndefined } from '@jiakun-zhao/utils'
import { addTypeTemplate, defineNuxtModule, resolvePath } from 'nuxt/kit'
import { parse } from 'toml'

const record: Record<string, string> = {
  // cSpell:disable-next-line
  hyperdrive: `import("@cloudflare/workers-types").Hyperdrive`,
  ai: `import("@cloudflare/workers-types").Ai`,
  analytics_engine_datasets: `import("@cloudflare/workers-types").AnalyticsEngineDataset`,
  d1_databases: `import("@cloudflare/workers-types").D1Database`,
  durable_objects: `import("@cloudflare/workers-types").DurableObjectNamespace`,
  kv_namespaces: `import("@cloudflare/workers-types").KVNamespace`,
  queues: `import("@cloudflare/workers-types").Queue<any>`,
  r2_buckets: `import("@cloudflare/workers-types").R2Bucket`,
  services: `import("@cloudflare/workers-types").Fetcher`,
  vectorize: `import("@cloudflare/workers-types").VectorizeIndex`,
}

export default defineNuxtModule({
  meta: {
    name: 'cloudflare',
  },
  async setup(_, nuxt) {
    if (!nuxt.options.dev)
      return
    addTypeTemplate({
      filename: 'types/cloudflare.d.ts',
      async getContents() {
        const { configPath, environment } = nuxt.options.nitro.cloudflareDev ?? {}
        if (isUndefined(environment))
          return ''
        const env = await getEnvConfig(configPath)
        if (!env || !env[environment])
          return ''
        const { vars, ...bindings } = env[environment]
        const types = Object.entries(bindings)
          .map(([name, bindings]) => bindings.map(({ binding }) => [binding, record[name]]))
          .flat()
          .concat(Object.keys(vars ?? {}).map(it => [it, 'string']))
          .filter(it => it.every(notUndefined)) as [string, string][]
        return generateTypes(types)
      },
    })
  },
})

type Vars = Record<string, string>
type Binding = { binding?: string }[]

async function getEnvConfig(configPath: string = 'wrangler.toml') {
  try {
    const path = await resolvePath(configPath)
    const raw = await readFile(path, 'utf-8')
    return parse(raw).env as Record<string, { vars?: Vars } & Record<string, Binding>>
  } catch {
    return null
  }
}

function generateTypes(entries: [string, string][]) {
  return [
    'import { PlatformProxy } from "wrangler";',
    'declare module "h3" {',
    '  interface H3EventContext {',
    '    cf: PlatformProxy["cf"]',
    '    cloudflare: {',
    '      request: Request & {',
    '        cf: PlatformProxy["cf"]',
    '      }',
    '      env: {',
    ...entries.map(([name, type]) => `        ${name}: ${type}`),
    '      }',
    '      context: PlatformProxy["ctx"]',
    '    }',
    '  }',
    '}',
  ].join('\n')
}
