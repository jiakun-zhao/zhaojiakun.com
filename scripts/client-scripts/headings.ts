import { $, $all } from './utils'

export default function () {
    $all('nav details ul li').forEach((li: HTMLLIElement) => {
        li.addEventListener('click', () => {
            const header: HTMLElement | null = $(`#${li.dataset.slug}`)
            if (header) {
                window.scrollTo({ top: header.offsetTop - 80, behavior: 'smooth' })
                $('nav details')?.removeAttribute('open')
            }
        })
    })
}
