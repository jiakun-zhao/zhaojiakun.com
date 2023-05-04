import type { PathLike } from 'node:fs'
import { accessSync } from 'node:fs'

export function isFileExist(path: PathLike) {
    try {
        accessSync(path)
        return true
    } catch {
        return false
    }
}
