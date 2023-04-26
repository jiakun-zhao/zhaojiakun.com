import './client-scripts/favicon'

import fn1 from './client-scripts/headings'
import fn2 from './client-scripts/wechat-title'
import fn3 from './client-scripts/shiki'

window.addEventListener('load', async () => {
    fn1()
    fn2()
    await fn3()
})
