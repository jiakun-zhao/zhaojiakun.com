import type { Lang } from 'shiki'
import { $all, $load, $new } from './utils'

export default async function () {
    try {
        await $load('https://cdn.jsdelivr.net/npm/shiki/dist/index.jsdelivr.iife.js')
        const { getHighlighter, BUNDLED_LANGUAGES } = window.shiki

        function isSupported(lang: string): lang is Lang {
            return !!BUNDLED_LANGUAGES.find(({ id, aliases }) => id === lang || aliases?.includes(lang))
        }

        const themes = ['vitesse-dark', 'vitesse-light']
        const h = await getHighlighter({ langs: [], themes })

        for (const el of Array.from($all('pre code'))) {
            const lang = el.className.match(/language-(.+)/)?.[1]
            const code = el.textContent
            if (!lang || !isSupported(lang) || !code)
                continue
            if (!h.getLoadedLanguages().includes(lang))
                await h.loadLanguage(lang)
            const wrapper = $new('div')
            wrapper.innerHTML = themes.map(theme => h.codeToHtml(code ?? '', { lang, theme })).join('')
            el.parentElement!.replaceWith(...Array.from(wrapper.childNodes))
        }
    } catch (err) {
        console.error(err)
    }
}
