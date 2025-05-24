interface CloudflareEnv {
  JIAKUN_ZHAO_R2: import('@cloudflare/workers-types').R2Bucket
}

type Runtime = import('@astrojs/cloudflare').Runtime<CloudflareEnv>

declare namespace App {
  interface Locals extends Runtime {

  }
}
