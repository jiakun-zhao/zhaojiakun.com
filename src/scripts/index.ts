import './favicon'
import shiki from './shiki'
import { $, $all } from './utils'

window.addEventListener('load', () => {
    // headings
    $all('nav details ul li').forEach((li: HTMLLIElement) => {
        li.addEventListener('click', () => {
            const header: HTMLElement | null = $(`#${li.dataset.slug}`)
            if (header) {
                window.scrollTo({ top: header.offsetTop - 80, behavior: 'smooth' })
                $('nav details')?.removeAttribute('open')
            }
        })
    })
    // wechat title
    if (navigator.userAgent.toLowerCase().includes('micromessenger')) {
        const title = document.title
        const observer = new IntersectionObserver(([{ intersectionRatio }]) => {
            document.title = intersectionRatio ? '' : title
        })
        observer.observe($('body header h1')!)
    }

    // shiki auto highlight
    shiki().catch(console.error)
})
