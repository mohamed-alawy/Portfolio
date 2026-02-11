import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Education from './components/Education'
import Experience from './components/Experience'
import Projects from './components/Projects'
import ProjectDetails from './components/ProjectDetails'
import Skills from './components/Skills'
import Certifications from './components/Certifications'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import AdminPage from './components/AdminPage'

import ScrollToTop from './components/ScrollToTop'

function App() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (e) => {
      const newTheme = e.matches ? 'dark' : 'light'
      setTheme(newTheme)
      document.documentElement.setAttribute('data-theme', newTheme)
    }

    // Set initial theme
    handleChange(mediaQuery)

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={
            <main>
              <Hero />
              <About />
              <Education />
              <Experience />
              <Projects />
              <Skills />
              <Certifications />
            </main>
          } />
          <Route path="/project/:id" element={<ProjectDetails />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
        <Footer />
        <Chatbot />
      </div>
    </Router>
  )
}

export default App
