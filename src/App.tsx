import Hero from './components/Hero'
import { useLiquidGlass } from './components/useLiquidGlass'
import { About, Contact, Projects } from './components/Sections'

export default function App() {
  useLiquidGlass()
  return (
    <main className="font-sans">
      <Hero />
      <Projects />
      <About />
      <Contact />
    </main>
  )
}
