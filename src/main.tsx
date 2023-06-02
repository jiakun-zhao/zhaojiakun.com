/* eslint-disable react/jsx-key */
import { MetaProvider } from '@solidjs/meta'
import { Route, Router, Routes } from '@solidjs/router'
import { lazy } from 'solid-js'
import { render } from 'solid-js/web'
import routes from '~solid-pages'
import Index from '~/pages/Index'

import 'uno.css'
import '~/assets/default.css'
import '~/assets/article.css'

const Posts = lazy(() => import('~/pages/Posts'))

render(
  () => (
    <MetaProvider>
      <Router>
        <Routes>
          <Route path="/" component={Index} />
          <Route path="/posts" component={Posts} />
          <Route path="/post" component={Posts} />
          {routes.map(route => (
            <Route path={`/post/${route.path}`} component={route.component} />
          ))}
          <Route path="/*all" element={<Index isNotFound={true} />} />
        </Routes>
      </Router>
    </MetaProvider>
  ),
  document.getElementById('root')!,
)
