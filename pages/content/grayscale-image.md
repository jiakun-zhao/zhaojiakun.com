---
title: Grayscale image
description: Grayscale image can reduce the file size, enabling quicker loading times during transmission or even allowing for base64 inline embedding. By enhancing the display quality of Grayscale image with effects such as Gaussian blur, one can then seamlessly transition to the original image when necessary, for instance, upon hovering over the image with a cursor.

scripts:
  - import thumb   from "~/assets/grayscale-image-thumb.webp"
  - const  regular =    "/_images/grayscale-image-regular.webp"
---

### [{{frontmatter.title}}](/)

:p{class="tracking-0" v-text="frontmatter.description"}

:temp-grayscale-image{:thumb="thumb" :regular="regular" :width="1080" :height="810" :alt="frontmatter.title"}