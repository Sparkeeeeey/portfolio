import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { asset } from '../asset'
import { person, projects } from '../data'
import Arrow from './Arrow'

const featured = projects[0]
const EASE = 'cubic-bezier(0.76, 0, 0.24, 1)'

type Phase = 'intro' | 'done'

export default function Hero() {
  const slot = useRef<HTMLDivElement>(null)
  const flyer = useRef<HTMLImageElement>(null)
  const [phase, setPhase] = useState<Phase>('intro')
  const [tilesIn, setTilesIn] = useState(false)
  const startRef = useRef<() => void>(() => {})

  // Until the intro finishes, links and buttons can't be used (keyboard included),
  // so nothing can jump the page mid-animation.
  useEffect(() => {
    if (phase === 'done') return
    const block = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return
      if (['Tab', 'Enter', ' ', 'ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End'].includes(e.key)) e.preventDefault()
    }
    window.addEventListener('keydown', block)
    return () => window.removeEventListener('keydown', block)
  }, [phase])

  useLayoutEffect(() => {
    const el = flyer.current
    const target = slot.current
    if (!el || !target) {
      setTilesIn(true)
      setPhase('done')
      return
    }
    document.documentElement.style.overflow = 'hidden'

    // Start: photo centered with lots of white space around it
    const vw = window.innerWidth
    const vh = window.innerHeight
    const w = Math.min(vw * 0.62, vh * 0.52, 440)
    const h = w * 1.25
    const start = { left: (vw - w) / 2, top: (vh - h) / 2, width: w, height: h }
    Object.assign(el.style, { left: `${start.left}px`, top: `${start.top}px`, width: `${w}px`, height: `${h}px` })

    // Keep the photo hidden until it has actually loaded AND the tab is on screen; only then fade it in
    // and start the ~1s hold. (Otherwise a slow connection or a background tab plays the whole intro
    // before anyone sees it.)
    el.style.opacity = '0'
    let fadeIn: Animation | undefined
    let t = 0
    let cancelled = false
    const whenVisible = () =>
      document.visibilityState === 'visible'
        ? Promise.resolve()
        : new Promise<void>((res) => {
            const on = () => {
              if (document.visibilityState === 'visible') {
                document.removeEventListener('visibilitychange', on)
                res()
              }
            }
            document.addEventListener('visibilitychange', on)
          })
    const imgReady = el.complete && el.naturalWidth ? Promise.resolve() : el.decode().catch(() => {})
    Promise.all([imgReady, whenVisible()]).then(() => {
      if (cancelled || started) return
      fadeIn = el.animate(
        [
          { opacity: 0, transform: 'scale(0.96)' },
          { opacity: 1, transform: 'scale(1)' },
        ],
        { duration: 900, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'both' },
      )
      t = window.setTimeout(start2, 1300)
    })

    // Hold the photo centered for ~1s, or start the move on the first scroll attempt
    let move: Animation | undefined
    let started = false
    const start2 = () => {
      if (started) return
      started = true
      el.style.opacity = '1'
      window.clearTimeout(t)
      removeListeners()
      const r = target.getBoundingClientRect()
      setTilesIn(true)
      move = el.animate(
        [
          { left: `${start.left}px`, top: `${start.top}px`, width: `${start.width}px`, height: `${start.height}px` },
          { left: `${r.left}px`, top: `${r.top}px`, width: `${r.width}px`, height: `${r.height}px` },
        ],
        { duration: 1200, easing: EASE, fill: 'forwards' },
      )
      move.onfinish = () => {
        setPhase('done')
        document.documentElement.style.overflow = ''
      }
    }
    startRef.current = start2
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return // leave browser shortcuts (refresh, tabs) alone
      start2()
    }
    const onScrollIntent = () => start2()
    const opts: AddEventListenerOptions = { passive: true }
    window.addEventListener('wheel', onScrollIntent, opts)
    window.addEventListener('touchmove', onScrollIntent, opts)
    window.addEventListener('keydown', onKey)
    const removeListeners = () => {
      window.removeEventListener('wheel', onScrollIntent)
      window.removeEventListener('touchmove', onScrollIntent)
      window.removeEventListener('keydown', onKey)
    }

    return () => {
      cancelled = true
      window.clearTimeout(t)
      removeListeners()
      fadeIn?.cancel()
      move?.cancel()
      document.documentElement.style.overflow = ''
    }
  }, [])

  const d = (ms: number) => ({ '--d': `${ms}ms` }) as React.CSSProperties

  return (
    <section className={`mx-auto flex w-full max-w-[1600px] flex-col gap-3 p-3 sm:p-4 lg:h-[100dvh] lg:min-h-[640px] ${tilesIn ? 'tiles-in' : ''}`}>
      {/* Top bar */}
      <header className="tile enter flex items-center justify-between px-5 py-4 sm:px-7" style={d(0)}>
        <a href="#" className="text-base font-bold tracking-tight sm:text-lg">
          {person.first} {person.last}
        </a>
        <nav className="flex gap-5 text-sm font-medium sm:gap-8">
          <a href="#projects" className="transition-opacity hover:opacity-60">Projects</a>
          <a href="#about" className="transition-opacity hover:opacity-60">About</a>
          <a href="#contact" className="transition-opacity hover:opacity-60">Contact</a>
        </nav>
      </header>

      <div className="grid flex-1 grid-cols-1 gap-3 lg:min-h-0 lg:grid-cols-[1fr_1.1fr_1fr] lg:grid-rows-[repeat(12,minmax(0,1fr))]">
        {/* Tagline */}
        <div className="tile enter order-2 flex flex-col justify-between gap-8 p-6 sm:p-8 lg:order-none lg:col-start-1 lg:row-[1/7]" style={d(120)}>
          <p className="label">Mechanical Engineering · CCNY ’28</p>
          <div>
            <h1 className="text-[2.1rem] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-5xl lg:text-[min(2.9vw,5.4vh)]">
              Designed in CAD.
              <br />
              Built by hand.
              <br />
              <span className="text-mute">Tested for real.</span>
            </h1>
          </div>
        </div>

        {/* Hero photo slot */}
        <div ref={slot} className="tile order-1 aspect-[4/5] lg:order-none lg:col-start-2 lg:row-[1/8] lg:aspect-auto" style={{ opacity: phase === 'done' ? 1 : 0 }}>
          <img
            src={asset('img/me.webp')}
            alt="Yoobin Park"
            className="h-full w-full object-cover object-[50%_20%]"
          />
        </div>

        {/* Featured project (spans both rows) */}
        <a
          href="#projects"
          className="tile tile-hover enter group order-3 flex flex-col p-3 lg:order-none lg:col-start-3 lg:row-[1/13]"
          style={d(240)}
        >
          <div className="px-3 pb-4 pt-3 pr-16">
            <p className="label">Featured project · {featured.date}</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{featured.title}</h2>
          </div>
          <div className="relative min-h-[260px] flex-1 overflow-hidden rounded-[12px]">
            <img
              src={asset(featured.cover.src)}
              alt={featured.cover.alt}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
          <p className="max-w-sm px-3 pb-2 pt-4 text-sm leading-relaxed text-mute">{featured.summary}</p>
          <Arrow className="absolute right-6 top-6" />
        </a>

        {/* Yoobin is a… */}
        <div className="tile enter order-4 flex flex-col justify-between gap-6 p-6 sm:p-8 lg:order-none lg:col-start-1 lg:row-[7/13]" style={d(360)}>
          <p className="label">About</p>
          <p className="text-lg leading-snug tracking-tight sm:text-xl lg:text-[min(1.45vw,2.7vh)]">
            <span className="font-semibold">Yoobin is a</span> mechanical engineering junior at CCNY who takes ideas from SolidWorks to
            working hardware, and does the machining, wiring and testing himself. Now looking for a{' '}
            <span className="font-semibold">Summer 2027 internship</span>.
          </p>
        </div>

        {/* Contact + links */}
        <div className="order-5 flex flex-col gap-3 lg:order-none lg:col-start-2 lg:row-[8/13] lg:min-h-0">
          <a href="#contact" className="tile tile-hover enter group flex flex-1 flex-col justify-between gap-6 p-6 sm:p-7 lg:min-h-0" style={d(480)}>
            <p className="label">Contact</p>
            <div>
              <p className="text-3xl font-semibold tracking-tight lg:text-[min(2.2vw,4vh)]">Contact me</p>
              <p className="mt-2 text-sm text-mute">Open to Summer 2027 mechanical engineering internships.</p>
            </div>
            <Arrow className="absolute right-6 top-6" />
          </a>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'LinkedIn', href: person.linkedin, ext: true },
              { label: 'Email', href: `mailto:${person.email}` },
              { label: 'Resume', href: asset('resume.pdf'), ext: true },
            ].map((l, i) => (
              <a
                key={l.label}
                href={l.href}
                {...(l.ext ? { target: '_blank', rel: 'noreferrer' } : {})}
                className="tile tile-hover enter group flex items-center justify-between px-4 py-4 text-sm font-medium sm:px-5"
                style={d(560 + i * 70)}
              >
                <span>{l.label}</span>
                <svg className="arrow" width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Click shield: any click during the intro starts it (or is ignored mid-move) instead of following a link */}
      {phase !== 'done' && <div className="fixed inset-0 z-40 cursor-pointer" onPointerDown={() => startRef.current()} aria-hidden="true" />}

      {/* Intro flyer: starts centered, then flies into the photo tile */}
      {phase !== 'done' && (
        <img
          ref={flyer}
          src={asset('img/me.webp')}
          alt=""
          aria-hidden="true"
          className="pointer-events-none fixed z-50 rounded-tile object-cover object-[50%_20%] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]"
          style={{ opacity: 0 }}
        />
      )}
    </section>
  )
}
