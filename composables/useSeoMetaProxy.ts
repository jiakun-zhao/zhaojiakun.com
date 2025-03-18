type UseSeoMetaInput = (typeof useSeoMeta extends (input: infer T) => void ? T : never) & { title?: string }

export function useSeoMetaProxy(input: UseSeoMetaInput) {
  useSeoMeta({
    ogTitle: input.title,
    twitterTitle: input.title,
    ogDescription: input.description,
    twitterDescription: input.description,
    twitterCard: 'summary',
    ...input,
  })
}
