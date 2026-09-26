import { useState } from 'react'
import { asset } from '../asset'
import type { Media, Project } from '../data'
import { experience, extras, person, projects } from '../data'
import Arrow from './Arrow'
import Logo from './Logo'
import { useReveal } from './useReveal'

function R({ as: Tag = 'div', className = '', children, ...rest }: { as?: 'div' | 'article' | 'a'; className?: string; children: React.ReactNode } & Record<string, unknown>) {
  const ref = useReveal<HTMLDivElement>()
  const T = Tag as 'div'
  return (
    <T ref={ref} className={`reveal ${className}`} {...rest}>
      {children}
    </T>
  )
}

function SectionTitle({ n, title, note }: { n: string; title: string; note?: string }) {
  return (
    <R className="tile tile-hover flex items-end justify-between px-5 py-5 sm:px-7">
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        <span className="mr-3 font-mono text-sm font-normal text-mute">{n}</span>
        {title}
      </h2>
      {note && <span className="label hidden sm:block">{note}</span>}
    </R>
  )
}

const isDrawing = (m: Media) => /cad|wiring/.test(m.src)

function MediaView({ m, className = '' }: { m: Media; className?: string }) {
  const fit = isDrawing(m) ? 'object-contain bg-white' : 'object-cover'
  return m.video ? (
    <video src={asset(m.src)} poster={m.poster ? asset(m.poster) : undefined} className={`h-full w-full ${fit} ${className}`} autoPlay muted loop playsInline preload="metadata" aria-label={m.alt} />
  ) : (
    <img src={asset(m.src)} alt={m.alt} loading="lazy" className={`h-full w-full ${fit} ${className}`} />
  )
}

function ProjectTile({ p, i }: { p: Project; i: number }) {
  const all = [p.cover, ...p.gallery]
  const [sel, setSel] = useState(0)
  const cur = all[sel]
  return (
    <R as="article" id={p.id} className="grid scroll-mt-4 grid-cols-1 gap-3 lg:grid-cols-[1.35fr_1fr]">
      <div className="tile flex flex-col gap-3 p-3">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[12px] bg-white lg:aspect-auto lg:h-[34rem]">
          <MediaView key={cur.src} m={cur} />
        </div>
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${all.length}, minmax(0, 1fr))` }}>
          {all.map((m, j) => (
            <button
              key={m.src}
              type="button"
              onClick={() => setSel(j)}
              aria-label={`Show: ${m.caption ?? m.alt}`}
              className={`aspect-square overflow-hidden rounded-[10px] bg-white transition ${j === sel ? 'ring-2 ring-ink ring-offset-2 ring-offset-tile' : 'opacity-60 hover:opacity-100'}`}
            >
              {m.video ? (
                <span className="flex h-full w-full items-center justify-center bg-ink font-mono text-[10px] uppercase tracking-widest text-paper">Video</span>
              ) : (
                <img src={asset(m.src)} alt="" loading="lazy" className={`h-full w-full ${isDrawing(m) ? 'object-contain' : 'object-cover'}`} />
              )}
            </button>
          ))}
        </div>
        {cur.caption && <p className="px-1 pb-1 text-xs text-mute">{cur.caption}</p>}
      </div>

      <div className="tile tile-hover flex flex-col p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <p className="label">
            {String(i + 1).padStart(2, '0')} · {p.team}
            {p.date ? ` · ${p.date}` : ''}
          </p>
        </div>
        <h3 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{p.title}</h3>
        <p className="mt-1 text-sm text-mute">{p.context}</p>
        <p className="mt-5 leading-relaxed">{p.summary}</p>

        <div className="mt-7 space-y-6 text-sm leading-relaxed">
          <div>
            <p className="label mb-2">Problem</p>
            <p>{p.problem}</p>
          </div>
          <div>
            <p className="label mb-2">What I did</p>
            <ul className="space-y-2">
              {p.did.map((x) => (
                <li key={x} className="flex gap-3">
                  <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-ink dot" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>
          {p.result && (
            <div>
              <p className="label mb-2">Result</p>
              <p>{p.result}</p>
            </div>
          )}
        </div>

        <div className="mt-auto flex flex-wrap gap-2 pt-8">
          {p.skills.map((s) => (
            <span key={s} className="chip rounded-full border border-line bg-paper px-3 py-1 text-xs">
              {s}
            </span>
          ))}
        </div>
      </div>
    </R>
  )
}

export function Projects() {
  return (
    <section id="projects" className="mx-auto flex max-w-[1600px] scroll-mt-4 flex-col gap-3 px-3 pt-16 sm:px-4 sm:pt-24">
      <SectionTitle n="01" title="Projects" note={`${projects.length} builds · click thumbnails to browse`} />
      {projects.map((p, i) => (
        <ProjectTile key={p.id} p={p} i={i} />
      ))}
    </section>
  )
}

export function About() {
  const { education, award, skills } = extras
  return (
    <section id="about" className="mx-auto flex max-w-[1600px] scroll-mt-4 flex-col gap-3 px-3 pt-16 sm:px-4 sm:pt-24">
      <SectionTitle n="02" title="About" />
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        <R className="tile tile-hover p-6 sm:p-8 lg:col-span-2">
          <p className="label">Experience</p>
          <div className="rule mt-4 divide-y divide-line">
            {experience.map((e) => (
              <div key={e.org} className="grid gap-3 py-5 sm:grid-cols-[9rem_1fr]">
                <p className="font-mono text-xs text-mute sm:pt-1.5">{e.years}</p>
                <div>
                  <div className="flex items-center gap-3">
                    <Logo src={e.logo} name={e.org} className="h-10 w-10" />
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight">{e.org}</h3>
                      <p className="text-sm text-mute">
                        {e.role} · {e.place}
                      </p>
                    </div>
                  </div>
                  <ul className="mt-3 space-y-1.5 text-sm leading-relaxed">
                    {e.points.map((x) => (
                      <li key={x} className="flex gap-3">
                        <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-ink dot" />
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </R>

        <div className="flex flex-col gap-3">
          <R className="tile tile-hover p-6 sm:p-8">
            <p className="label">Education</p>
            <div className="mt-4 flex items-center gap-3">
              <Logo src={education.logo} name={education.school} className="h-12 w-12" />
              <div>
                <h3 className="text-xl font-semibold tracking-tight">{education.degree}</h3>
                <p className="text-sm">{education.school}</p>
              </div>
            </div>
            <p className="mt-3 text-sm font-medium">{education.sub}</p>
            <p className="mt-3 font-mono text-xs text-mute">{education.years}</p>
            <p className="mt-1 text-sm text-mute">{education.clubs}</p>
          </R>
          <R as="a" href="#vex" className="tile tile-vex group flex-1 p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <Logo src={award.logo} name="VEX Robotics" dark className="h-10 w-10" />
                <p className="label">Award · {award.year}</p>
              </div>
              <Arrow />
            </div>
            <p className="mt-6 text-6xl font-semibold tracking-tight">2nd</p>
            <p className="text-sm opacity-70">worldwide of 5,000+ teams</p>
            <h3 className="mt-5 text-lg font-semibold">{award.title}</h3>
            <p className="mt-1 text-sm opacity-70">Team captain, design lead and programmer. See the robots →</p>
          </R>
        </div>

        <R className="tile tile-hover p-6 sm:p-8 lg:col-span-3">
          <p className="label">Skills</p>
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((s) => (
              <div key={s.group}>
                <h3 className="font-semibold">{s.group}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mute">{s.items}</p>
              </div>
            ))}
          </div>
        </R>
      </div>
    </section>
  )
}

export function Contact() {
  const links = [
    { label: 'LinkedIn', sub: 'in/yoobspark', href: person.linkedin, ext: true },
    { label: 'Email', sub: person.email, href: `mailto:${person.email}` },
    { label: 'Resume', sub: 'Download PDF', href: asset('resume.pdf'), ext: true },
  ]
  return (
    <section id="contact" className="mx-auto flex max-w-[1600px] scroll-mt-4 flex-col gap-3 px-3 pb-3 pt-16 sm:px-4 sm:pb-4 sm:pt-24">
      <SectionTitle n="03" title="Contact" />
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        <R className="tile tile-hover flex flex-col justify-between gap-10 p-6 sm:p-10 lg:col-span-2 lg:min-h-[22rem]">
          <p className="label">Open to Summer 2027 internships</p>
          <div>
            <p className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Need someone who can design it <span className="text-mute">and</span> build it? Let’s talk.
            </p>
            <a href={`mailto:${person.email}`} className="mt-6 inline-block break-all text-lg underline decoration-1 underline-offset-4 hover:opacity-60 sm:text-2xl">
              {person.email}
            </a>
          </div>
        </R>
        <div className="grid grid-cols-1 gap-3">
          {links.map((l) => (
            <R
              as="a"
              key={l.label}
              href={l.href}
              {...(l.ext ? { target: '_blank', rel: 'noreferrer' } : {})}
              className="tile tile-hover group flex items-center justify-between p-6"
            >
              <div>
                <p className="text-xl font-semibold tracking-tight">{l.label}</p>
                <p className="mt-1 break-all text-sm opacity-60">{l.sub}</p>
              </div>
              <Arrow />
            </R>
          ))}
        </div>
      </div>
      <footer className="flex justify-between px-2 py-6 font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
        <span>© {new Date().getFullYear()} Yoobin Park</span>
        <a href="#" className="hover:text-ink">Back to top ↑</a>
      </footer>
    </section>
  )
}
