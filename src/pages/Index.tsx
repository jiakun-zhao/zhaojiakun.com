import Links from '~/components/Links'
import Meta from '~/components/Meta'

interface IndexProps {
  isNotFound?: boolean
}

export default function Index(props: IndexProps) {
  const title = props.isNotFound ? 'Not Found' : 'Hi~'
  const description = props.isNotFound ? '404' : 'Hi there 👋'
  return (
    <>
      <Meta title={title} description={description} />
      <main shortcut-container>
        <h3 shortcut-header>{title}</h3>
        <article>
          <p max-w-lg mt-6>
            { props.isNotFound
              ? '你不该来这儿，而应该是：'
              : '我正在思索如何设计与构建一个足够让我满意的个人网站，那么在此之前让这些以最简单的方式呈现：'}
            <Links isIndexIncluded={props.isNotFound} />
          </p>
        </article>
      </main>
    </>
  )
}
