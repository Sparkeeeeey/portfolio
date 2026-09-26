import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/manrope'
import '@fontsource/jetbrains-mono/400.css'
import './index.css'
import App from './App'

// Every load/refresh starts at the top and plays the intro, even if the URL ends in #about etc.
// (Browsers otherwise restore the old scroll position or jump to the #section, which skips the intro.)
if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
if (window.location.hash) history.replaceState(null, '', window.location.pathname + window.location.search)
window.scrollTo(0, 0)

// In-page links (#projects, #about, ...) scroll smoothly without putting #... in the address bar,
// so refreshing never lands mid-page.
document.addEventListener('click', (e) => {
  const a = (e.target as HTMLElement).closest?.('a[href^="#"]') as HTMLAnchorElement | null
  if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return
  const id = a.getAttribute('href')!.slice(1)
  e.preventDefault()
  if (!id) window.scrollTo({ top: 0, behavior: 'smooth' })
  else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
