---
title: JavaScript Snippets
description: 记录一些 JavaScript 的代码片段与小技巧
date: 2023-05-30 12:07:03
draft: true
---

### Array

```ts
Array.from({ length: 6 }, (_, i) => i) // [0, 1, 2, 3, 4, 5]
Array(6).fill('A') // ['A', 'A', 'A', 'A', 'A', 'A']
```

### 技巧...

``` ts
!!undefined // false
!!null // false
!!0 // false
!!-0 // false
!!NaN // false
!!'' // false
!!'ABC' // true

let a = +'3.14' // 字符串转数字: a=3.14
const b = ~~3.14 // 取整：b=3

a &&= b // 或者 ||= ??= 等同于下面的举例
// => a && (a = b)
//    a = a ? b : a
```