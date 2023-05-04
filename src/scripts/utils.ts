export const $: Document['querySelector'] = document.querySelector.bind(document)
export const $all: Document['querySelectorAll'] = document.querySelectorAll.bind(document)
export const $new: Document['createElement'] = document.createElement.bind(document)

export const random = (max: number) => Math.floor(Math.random() * max)

export const $load = async function (src: string) {
    return new Promise((resolve, reject) => {
        const script = $new('script')
        script.onload = resolve
        script.onerror = reject
        script.defer = true
        script.src = src
        document.head.appendChild(script)
    })
}
