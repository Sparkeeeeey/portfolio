import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/manrope'
import '@fontsource/jetbrains-mono/400.css'
import './index.css'
import App from './App'

// Always start at the top on a fresh load so the intro plays (browsers otherwise restore the
// old scroll position on reload, which skips it). Links to a section (#vex etc.) still jump there.
if (!window.location.hash) {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
  window.scrollTo(0, 0)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
