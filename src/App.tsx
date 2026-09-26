import Hero from './components/Hero'
import { About, Contact, Projects } from './components/Sections'

export default function App() {
  return (
    <main className="font-sans">
      <Hero />
      <Projects />
      <About />
      <Contact />
    </main>
  )
}
