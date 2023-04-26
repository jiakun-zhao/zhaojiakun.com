/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module '~/client-scripts'

declare global {
    var shiki: typeof import('shiki')
}

export {}
