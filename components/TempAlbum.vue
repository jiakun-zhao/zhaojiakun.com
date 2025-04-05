<script lang="ts" setup>
import ColorThief from 'colorthief'
import { BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, SRGBColorSpace, TextureLoader, WebGLRenderer } from 'three'

const canvasEl = ref<HTMLCanvasElement>()
const disposeTasks: Set<() => void> = new Set()

async function load(url: string, scale: number = 0.1) {
  const image: HTMLImageElement = await new Promise((resolve) => {
    const img = document.createElement('img')
    img.onload = () => resolve(img)
    img.src = url
  })
  const canvas = document.createElement('canvas')
  canvas.width = image.naturalWidth
  canvas.height = image.naturalWidth * scale
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = `rgb(${new ColorThief().getColor(image).join()})`
  ctx.fillStyle = '#954'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  return [image.src, canvas.toDataURL()] as const
}

onMounted(async () => {
  const canvas = canvasEl.value!
  const canvasBoundingClientRect = canvas.getBoundingClientRect()
  canvas.width = window.devicePixelRatio * canvasBoundingClientRect.width
  canvas.height = window.devicePixelRatio * canvasBoundingClientRect.height

  const scale = 0.1

  const [frontImage, sideImage] = await load('/_images/album-harry-styles.webp', scale)

  const renderer = new WebGLRenderer({ antialias: true, canvas, alpha: true })
  disposeTasks.add(renderer.dispose)
  const camera = new PerspectiveCamera(55, 1, 0.1, 2000)
  camera.position.z = 2.5

  const loader = new TextureLoader()

  const frontTexture = await loader.loadAsync(frontImage)
  frontTexture.colorSpace = SRGBColorSpace
  disposeTasks.add(frontTexture.dispose)
  const sideTexture = await loader.loadAsync(sideImage)
  sideTexture.colorSpace = SRGBColorSpace
  disposeTasks.add(sideTexture.dispose)

  const frontMeshBasicMaterial = new MeshBasicMaterial({ map: frontTexture })
  disposeTasks.add(frontMeshBasicMaterial.dispose)
  const sideMeshBasicMaterial = new MeshBasicMaterial({ map: sideTexture })
  disposeTasks.add(sideMeshBasicMaterial.dispose)

  const scene = new Scene()
  const geometry = new BoxGeometry(1, 1, scale)
  const cube = new Mesh(geometry, [
    sideMeshBasicMaterial,
    sideMeshBasicMaterial,
    sideMeshBasicMaterial,
    sideMeshBasicMaterial,
    frontMeshBasicMaterial,
    frontMeshBasicMaterial,
  ])
  cube.rotation.z = 0.05
  scene.add(cube)

  disposeTasks.add(geometry.dispose)

  function render(time: number) {
    if (!disposeTasks.size)
      return
    time *= 0.00035
    cube.rotation.y = time
    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }

  requestAnimationFrame(render)
})

onBeforeUnmount(() => {
  disposeTasks.forEach((fn) => {
    try {
      fn()
    } catch { }
  })
  disposeTasks.clear()
})
</script>

<template>
  <div aspect="1/1" rd-lg bg-shadcn-muted:36 b="1 shadcn solid">
    <canvas ref="canvasEl" size-full />
  </div>
</template>
