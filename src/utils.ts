export const BASE_URL = location.origin

export function unoAttribute<T extends Element>(el: T, uno: string) {
  uno.split(' ').filter(Boolean).forEach(attr => el.setAttribute(attr, ''))
}
