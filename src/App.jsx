
import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './Pages/Navbar'
import Home from './Pages/Home'
import About from './Pages/About'
import Skills from './Pages/Skills'
import Projects from './Pages/Projects'
import FutureProjects from './Pages/FutureProjects'
import Experience from './Pages/Experience'
import Certifications from './Pages/Certifications'
import Achievements from './Pages/Achievements'
import Contact from './Pages/Contact'
import Signature from './Pages/Signature'
import SpotlightBackground from './Components/SpotlightBackground'

const App = () => {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '')
      const element = document.getElementById(id)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [location])

  return (
    <div className="bg-[#070708] min-h-screen text-white">
      <SpotlightBackground />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/future-projects" element={<FutureProjects />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Signature />
    </div>
  )
}

export default App

