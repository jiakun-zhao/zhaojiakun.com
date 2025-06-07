interface Signal<T> {
  value: T
  observers: (() => void)[]
}

const observers: (() => void)[] = []

function createSignal<T>(initialValue: T) {
  const signal: Signal<T> = {
    value: initialValue,
    observers: [],
  }
  const getter = readSignal.bind(signal) as () => T
  const setter = writeSignal.bind(signal) as (value: T) => void
  return [getter, setter] as const
}

function createEffect(fn: () => void) {
  try {
    observers.push(fn)
    fn()
  } finally {
    observers.pop()
  }
}

function readSignal<T>(this: Signal<T>) {
  if (observers.length > 0) {
    const observer = observers.at(-1)
    this.observers.push(observer)
  }
  return this.value
}

function writeSignal<T>(this: Signal<T>, value: T) {
  this.value = value
  if (this.observers.length > 0) {
    this.observers.forEach(fn => fn())
  }
}

const [getCount, setCount] = createSignal(0)

createEffect(() => {
  console.log('Effect', getCount())
})

console.log(getCount())

setCount(1)

console.log(getCount())

class Fragment {
  private node: Node

  constructor(html: string) {
    const temp = document.createElement('template')
    temp.innerHTML = html
    this.node = temp.content.firstChild

    console.log(this.node)
    console.log(this.node.firstChild.firstChild.nextSibling)
  }
}

const fragment = new Fragment('<div><span>Count: <!></span><button>Click me</button>')
