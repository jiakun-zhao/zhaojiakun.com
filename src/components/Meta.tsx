import { Meta as SolidMeta, Title } from '@solidjs/meta'
import type { MetaProps } from '~/types'

export default function Meta(props: MetaProps) {
  const ogImage = `${location.origin}/og/${props.ogImage ?? 'icon.jpg'}`
  const description = props.description ?? props.title
  return (
    <>
      {/* title */}
      <Title>{props.title}</Title>
      <SolidMeta property="og:title" content={props.title} />
      <SolidMeta name="twitter:title" content={props.title} />
      {/* author */}
      <SolidMeta name="author" content={props.author ?? 'Jiakun Zhao'} />
      {/* description */}
      <SolidMeta name="description" content={description} />
      <SolidMeta property="og:description" content={description} />
      <SolidMeta name="twitter:description" content={description} />
      {/* og:image */}
      <SolidMeta property="og:image" content={ogImage} />
      <SolidMeta name="twitter:image" content={ogImage} />
    </>
  )
}
