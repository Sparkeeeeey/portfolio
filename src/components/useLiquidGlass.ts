import { useEffect } from 'react'

/**
 * Liquid-glass tiles: injects a tinted, blurred backdrop layer into every `.tile`, and on
 * Chromium browsers bends that layer at the edges with an SVG displacement map
 * (a lens-like rim, the same technique as Apple-style "liquid glass" demos).
 * Other browsers keep the frosted glass without the refraction.
 */
const RADIUS = 18
const BEZEL = 34
const SCALE = 60
const RES = 0.5 // displacement maps are drawn at half resolution

const isChromium = typeof navigator !== 'undefined' && /Chrome\//.test(navigator.userAgent)

function makeMap(w: number, h: number): string {
  const cw = Math.max(2, Math.round(w * RES))
  const ch = Math.max(2, Math.round(h * RES))
  const c = document.createElement('canvas')
  c.width = cw
  c.height = ch
  const ctx = c.getContext('2d')!
  const img = ctx.createImageData(cw, ch)
  const hx = w / 2
  const hy = h / 2
  const r = Math.min(RADIUS, hx, hy)
  const bezel = Math.min(BEZEL, hx * 0.5, hy * 0.5)
  for (let j = 0; j < ch; j++) {
    for (let i = 0; i < cw; i++) {
      const px = (i + 0.5) / RES - hx
      const py = (j + 0.5) / RES - hy
      const qx = Math.abs(px) - (hx - r)
      const qy = Math.abs(py) - (hy - r)
      const ox = Math.max(qx, 0)
      const oy = Math.max(qy, 0)
      const dist = Math.hypot(ox, oy) + Math.min(Math.max(qx, qy), 0) - r // < 0 inside
      let nx = 0
      let ny = 0
      if (qx > 0 && qy > 0) {
        const l = Math.hypot(ox, oy) || 1
        nx = (ox / l) * Math.sign(px)
        ny = (oy / l) * Math.sign(py)
      } else if (qx > qy) nx = Math.sign(px)
      else ny = Math.sign(py)
      const inside = -dist
      let m = 0
      if (inside < bezel) {
        const t = 1 - Math.max(inside, 0) / bezel
        m = t * t
      }
      const k = (j * cw + i) * 4
      img.data[k] = 128 - nx * m * 127 // R: x displacement (pull toward the centre)
      img.data[k + 1] = 128 - ny * m * 127 // G: y displacement
      img.data[k + 2] = 128
      img.data[k + 3] = 255
    }
  }
  ctx.putImageData(img, 0, 0)
  return c.toDataURL()
}

export function useLiquidGlass() {
  useEffect(() => {
    const NS = 'http://www.w3.org/2000/svg'
    const svg = document.createElementNS(NS, 'svg')
    svg.setAttribute('width', '0')
    svg.setAttribute('height', '0')
    svg.setAttribute('aria-hidden', 'true')
    svg.style.position = 'absolute'
    document.body.appendChild(svg)

    const cache = new Map<string, string>() // "w x h" -> filter id
    let n = 0
    const filterFor = (w: number, h: number) => {
      const key = `${Math.round(w / 4) * 4}x${Math.round(h / 4) * 4}`
      const hit = cache.get(key)
      if (hit) return hit
      const id = `lg-${n++}`
      const f = document.createElementNS(NS, 'filter')
      f.setAttribute('id', id)
      f.setAttribute('x', '0')
      f.setAttribute('y', '0')
      f.setAttribute('width', String(w))
      f.setAttribute('height', String(h))
      f.setAttribute('filterUnits', 'userSpaceOnUse')
      f.setAttribute('color-interpolation-filters', 'sRGB')
      const im = document.createElementNS(NS, 'feImage')
      im.setAttribute('href', makeMap(w, h))
      im.setAttribute('x', '0')
      im.setAttribute('y', '0')
      im.setAttribute('width', String(w))
      im.setAttribute('height', String(h))
      im.setAttribute('preserveAspectRatio', 'none')
      im.setAttribute('result', 'map')
      const dm = document.createElementNS(NS, 'feDisplacementMap')
      dm.setAttribute('in', 'SourceGraphic')
      dm.setAttribute('in2', 'map')
      dm.setAttribute('scale', String(SCALE))
      dm.setAttribute('xChannelSelector', 'R')
      dm.setAttribute('yChannelSelector', 'G')
      f.append(im, dm)
      svg.appendChild(f)
      cache.set(key, id)
      return id
    }

    const layers = new Map<Element, HTMLDivElement>()
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) {
        const layer = layers.get(e.target)
        if (!layer || !isChromium) continue
        const box = e.borderBoxSize?.[0]
        const width = box ? box.inlineSize : (e.target as HTMLElement).offsetWidth
        const height = box ? box.blockSize : (e.target as HTMLElement).offsetHeight
        if (width < 8 || height < 8) continue
        layer.style.filter = `url(#${filterFor(width, height)})`
      }
    })

    const attach = () => {
      document.querySelectorAll('.tile').forEach((tile) => {
        if (layers.has(tile)) return
        const layer = document.createElement('div')
        layer.className = 'glass-layer'
        tile.appendChild(layer)
        layers.set(tile, layer)
        ro.observe(tile)
      })
    }
    attach()
    const mo = new MutationObserver(attach)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      mo.disconnect()
      ro.disconnect()
      layers.forEach((l) => l.remove())
      svg.remove()
    }
  }, [])
}
