import { A } from '@solidjs/router'
import { For } from 'solid-js'

export interface LinksProps {
  isIndexIncluded?: boolean
}

export default function Links(props: LinksProps) {
  const links = [
    ['/', '首页'],
    ['/posts', '博客'],
    ['/about', '关于'],
  ]

  return (
    <For each={links.slice(props.isIndexIncluded ? 0 : 1)}>
      {([link, name]) => (
        <>
          <A ml="0.5" href={link}>{name}</A>
          <span class="last-of-type:hidden" mr-2>,</span>
        </>
      )}
    </For>
  )
}
