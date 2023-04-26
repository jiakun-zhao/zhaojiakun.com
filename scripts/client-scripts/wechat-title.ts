import { $ } from './utils'

export default function () {
    if (navigator.userAgent.toLowerCase().includes('micromessenger')) {
        const title = document.title
        const observer = new IntersectionObserver(([{ intersectionRatio }]) => {
            document.title = intersectionRatio ? '' : title
        })
        observer.observe($('body header h1')!)
    }
}
