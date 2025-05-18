import MD5 from 'crypto-js/md5'
import Zip from 'jszip'

const input = document.querySelector('textarea')
const format = document.getElementById('format') as HTMLButtonElement
const btn16 = document.getElementById('btn16') as HTMLButtonElement
const btn32 = document.getElementById('btn32') as HTMLButtonElement
const items = [{ el: btn16, fn: to16BitMD5 }, { el: btn32, fn: to32BitMD5 }]

format.addEventListener('click', () => {
  const { valid, invalid } = formatText(input.value)
  input.value = `${valid.join('\n')}\n\n${invalid.join('\n')}`.trim()
})

for (const it of items) {
  it.el.addEventListener('click', () => {
    const lines = formatText(input.value).valid
    console.log(lines) // oxlint-disable-line no-console
    if (lines.length === 0) {
      alert('No value.') // oxlint-disable-line no-alert
    } else {
      Promise.all(lines.map(line => it.fn(line))).then(toZip).then(saveAs)
    }
  })
}

function formatText(value: string) {
  const valid: string[] = []
  const invalid: string[] = []
  const lines = value.split('\n').filter(it => it.length)
  for (const line of lines) {
    const text = line.replace(/\s/g, '')
    if (/^\d{11}$/.test(text)) {
      valid.push(text)
    } else {
      invalid.push(line)
    }
  }
  return { valid, invalid }
}

async function to32BitMD5(value: string) {
  return MD5(value).toString()
}

async function to16BitMD5(value: string) {
  return (await to32BitMD5(value)).substring(8, 24)
}

async function toZip(lines: string[]) {
  const zip = new Zip()
  zip.file('value.txt', lines.join('\n'))
  return zip.generateAsync({ type: 'blob' })
}

function saveAs(file: Blob) {
  const a = document.createElement('a')
  const url = URL.createObjectURL(file)
  const filename = `${new Date().toDateString()}.zip`
  a.href = url
  a.download = filename
  a.click()
  window.URL.revokeObjectURL(url)
}
