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

import ScrollToTop from './components/ScrollToTop'

function App() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    // Check system preference or saved theme
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
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
        </Routes>
        <Footer />
        <Chatbot />
      </div>
    </Router>
  )
}

export default App
