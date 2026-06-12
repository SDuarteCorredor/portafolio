import { useLenis } from './hooks/useLenis'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { Stats } from './components/Stats'
import { Services } from './components/Services'
import { Work } from './components/Work'
import { About } from './components/About'
import { Contact } from './components/Contact'

export default function App() {
  useLenis()

  return (
    <div className="grain relative">
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Stats />
        <Work />
        <Services />
        <About />
        <Contact />
      </main>
    </div>
  )
}
