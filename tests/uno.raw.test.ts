import { createGenerator, presetWind3 } from 'unocss'
import { expect, it } from 'vitest'

it('uno.raw', async () => {
  const uno = await createGenerator({
    presets: [
      presetWind3({ preflight: false }),
    ],
    rules: [
      [/^\[raw:([^:]+):([^\]]+)\]$/, ([, key, value]) => ({ [key]: value.replaceAll('_', '') })],
    ],
  })

  const res = await uno.generate('class="text-red [raw:color=red]"')
  expect(res.matched).toMatchInlineSnapshot(`
    Set {
      "[raw:color=red]",
      "text-red",
    }
  `)
  expect(res.css).toMatchInlineSnapshot(`
    "/* layer: default */
    .\\[raw\\:color\\=red\\]{raw:color=red;}
    .text-red{--un-text-opacity:1;color:rgb(248 113 113 / var(--un-text-opacity));}"
  `)
})
