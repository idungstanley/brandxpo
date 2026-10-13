"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js"
import { BrandSymbol, SYMBOL_B_PATH, SYMBOL_TOP_PATH } from "./brand"

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v))
const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t))
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

// Symbol footprint in SVG units (see SYMBOL_VIEWBOX); used to centre the pieces.
const CX = 512
const CY = 511
const HEIGHT = 610
const DEPTH = 70

// Product-photography lighting: a dark studio with a few bright softboxes.
// Chrome only looks like chrome when it has crisp highlights to reflect.
function buildStudio() {
  const studio = new THREE.Scene()
  studio.background = new THREE.Color(0x050505)
  const softbox = (w: number, h: number, intensity: number, pos: [number, number, number]) => {
    const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 1, 1).multiplyScalar(intensity), side: THREE.DoubleSide })
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat)
    mesh.position.set(...pos)
    mesh.lookAt(0, 0, 0)
    studio.add(mesh)
  }
  softbox(18, 5, 14, [0, 9, 4]) // overhead strip
  softbox(3, 14, 12, [-9, 1, 5]) // left vertical strip
  softbox(2, 12, 8, [8, -1, 6]) // right kicker
  // Front panel with a diagonal gradient and a bright band: this is what the
  // flat faces reflect, so it gives them the graded chrome look.
  const canvas = document.createElement("canvas")
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext("2d")
  if (ctx) {
    const g = ctx.createLinearGradient(0, 0, 512, 512)
    g.addColorStop(0, "#ffffff")
    g.addColorStop(0.32, "#5a5a5a")
    g.addColorStop(0.48, "#f5f5f5")
    g.addColorStop(0.56, "#3a3a3a")
    g.addColorStop(1, "#0c0c0c")
    ctx.fillStyle = g
    ctx.fillRect(0, 0, 512, 512)
  }
  const gradient = new THREE.CanvasTexture(canvas)
  gradient.colorSpace = THREE.SRGBColorSpace
  const front = new THREE.Mesh(
    new THREE.PlaneGeometry(26, 20),
    new THREE.MeshBasicMaterial({ map: gradient, color: new THREE.Color(2.4, 2.4, 2.4), side: THREE.DoubleSide }),
  )
  front.position.set(0, 0, 14)
  front.lookAt(0, 0, 0)
  studio.add(front)
  softbox(8, 3, 5, [0, -7, -6]) // low back rim
  return studio
}

function buildPiece(d: string, material: THREE.Material) {
  const data = new SVGLoader().parse(`<svg xmlns="http://www.w3.org/2000/svg"><path d="${d}"/></svg>`)
  const shapes = data.paths.flatMap((p) => SVGLoader.createShapes(p))
  const geometry = new THREE.ExtrudeGeometry(shapes, {
    depth: DEPTH,
    bevelEnabled: true,
    bevelThickness: 12,
    bevelSize: 7,
    bevelSegments: 8,
    curveSegments: 64,
  })
  geometry.translate(-CX, -CY, -DEPTH / 2)
  geometry.computeVertexNormals()
  return new THREE.Mesh(geometry, material)
}

/*
  The brandXpo symbol as a live 3D object.
  - On load the two pieces fly in and lock together.
  - `progress` (0..1, scroll through the pinned hero) turns the mark one full
    revolution and briefly separates the pieces mid-way, ending face-on.
  - The pointer tilts it slightly.
*/
export function Hero3D({
  progress,
  className,
}: {
  progress: React.MutableRefObject<number>
  className?: string
}) {
  const mountRef = useRef<HTMLDivElement>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" })
    } catch {
      setFailed(true)
      return
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.3
    renderer.domElement.style.width = "100%"
    renderer.domElement.style.height = "100%"
    renderer.domElement.style.display = "block"
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const pmrem = new THREE.PMREMGenerator(renderer)
    const studio = buildStudio()
    const envTexture = pmrem.fromScene(studio, 0.02).texture
    scene.environment = envTexture

    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100)
    camera.position.set(0, 0, 11)

    // Polished chrome: reads as premium against the black hero
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xf4f4f4,
      metalness: 1,
      roughness: 0.1,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
      envMapIntensity: 1.6,
    })

    const key = new THREE.DirectionalLight(0xffffff, 2.2)
    key.position.set(4, 5, 6)
    const rim = new THREE.DirectionalLight(0xffffff, 3)
    rim.position.set(-6, 2, -4)
    // A moving glint that sweeps across the faces
    const sweep = new THREE.PointLight(0xffffff, 60, 20, 2)
    sweep.position.set(-6, 3, 4)
    scene.add(key, rim, sweep, new THREE.AmbientLight(0xffffff, 0.1))

    const top = buildPiece(SYMBOL_TOP_PATH, material)
    const b = buildPiece(SYMBOL_B_PATH, material)

    // Pivot flips SVG's downward y axis and scales to ~3.4 world units tall.
    const s = 3.4 / HEIGHT
    const pivot = new THREE.Group()
    pivot.scale.set(s, -s, s)
    pivot.add(top, b)
    const root = new THREE.Group()
    root.add(pivot)
    scene.add(root)

    const resize = () => {
      const { width, height } = mount.getBoundingClientRect()
      if (!width || !height) return
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      // Keep the whole mark in frame on narrow containers
      camera.position.z = camera.aspect < 0.8 ? 11 / camera.aspect * 0.8 : 11
      camera.updateProjectionMatrix()
    }
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(mount)
    resize()

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 }
    const onPointer = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1
      pointer.ty = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener("pointermove", onPointer, { passive: true })

    let visible = true
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting))
    io.observe(mount)

    const start = performance.now()
    let smoothP = progress.current
    let frame = 0

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick)
      if (!visible) return
      const t = (now - start) / 1000

      const intro = reduced ? 1 : easeOutExpo(clamp((t - 0.3) / 2.2))
      smoothP += (progress.current - smoothP) * 0.08
      const p = smoothP

      // Mid-scroll separation: pieces drift apart, then lock back in
      const split = Math.sin(clamp((p - 0.2) / 0.6) * Math.PI) * 0.9
      const apart = 1 - intro + split

      top.position.set(-40 * apart, -260 * apart, 160 * apart)
      top.rotation.set(0, 0, -0.5 * (1 - intro))
      b.position.set(120 * apart, 60 * apart, -120 * apart)
      b.rotation.set(0, -0.6 * (1 - intro), 0)

      pointer.x += (pointer.tx - pointer.x) * 0.05
      pointer.y += (pointer.ty - pointer.y) * 0.05

      const spin = easeInOut(clamp(p / 0.95)) * Math.PI * 2
      root.rotation.y = -0.38 + spin + (1 - intro) * -1.2 + pointer.x * 0.25
      root.rotation.x = Math.sin(p * Math.PI) * 0.18 + pointer.y * 0.12
      root.position.y = reduced ? 0 : Math.sin(t * 0.9) * 0.06
      root.scale.setScalar(0.85 + intro * 0.15)
      sweep.position.x = reduced ? 3 : Math.sin(t * 0.45) * 7

      renderer.render(scene, camera)
    }
    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      io.disconnect()
      resizeObserver.disconnect()
      window.removeEventListener("pointermove", onPointer)
      top.geometry.dispose()
      b.geometry.dispose()
      material.dispose()
      envTexture.dispose()
      studio.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose()
          const m = o.material as THREE.MeshBasicMaterial
          m.map?.dispose()
          m.dispose()
        }
      })
      pmrem.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [progress])

  if (failed) {
    return (
      <div className={className}>
        <BrandSymbol animated className="h-full w-auto mx-auto text-paper" />
      </div>
    )
  }

  return <div ref={mountRef} className={className} aria-hidden="true" />
}
