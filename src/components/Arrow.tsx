export default function Arrow({ className = '' }: { className?: string }) {
  return (
    <span className={`arrow-btn inline-flex h-10 w-10 items-center justify-center rounded-full bg-ink text-paper ${className}`} aria-hidden="true">
      <svg className="arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}
