import { useState } from 'react'
import { asset } from '../asset'

/** Shows a logo image from public/img/logos; falls back to a monogram if the file is missing. */
export default function Logo({ src, name, className = '', dark = false }: { src?: string; name: string; className?: string; dark?: boolean }) {
  const [failed, setFailed] = useState(!src)
  const initials = name
    .replace(/^The /, '')
    .split(/\s+/)
    .filter((w) => /^[A-Z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[10px] ${dark ? 'bg-paper' : 'bg-white'} ${className}`}
      aria-hidden={failed ? 'true' : undefined}
    >
      {failed ? (
        <span className="font-mono text-[11px] font-medium tracking-wider text-ink">{initials}</span>
      ) : (
        <img src={asset(src!)} alt={`${name} logo`} className="h-full w-full object-contain p-1.5" onError={() => setFailed(true)} />
      )}
    </span>
  )
}
