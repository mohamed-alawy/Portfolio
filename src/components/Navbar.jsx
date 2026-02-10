import React, { useState } from 'react'
import { Menu, X, Moon, Sun, Github, Linkedin } from 'lucide-react'
import { motion } from 'framer-motion'
import '../styles/Navbar.css'

const Navbar = ({ theme, toggleTheme }) => {
    const [isOpen, setIsOpen] = useState(false)

    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Education', href: '#education' },
        { name: 'Experience', href: '#experience' },
        { name: 'Projects', href: '#projects' },
        { name: 'Skills', href: '#skills' },
        { name: 'Certificates', href: '#certifications' },
        { name: 'Contact', href: '#contact' },
    ]

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="logo">
                    <a href="#">MA.</a>
                </div>

                <div className="desktop-menu">
                    {navLinks.map((link) => (
                        <a key={link.name} href={link.href} className="nav-link">
                            {link.name}
                        </a>
                    ))}
                    <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>

                <div className="mobile-menu-btn">
                    <button onClick={toggleTheme} className="theme-toggle-mobile" aria-label="Toggle Theme">
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <button onClick={() => setIsOpen(!isOpen)} aria-label="Menu">
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mobile-menu"
                >
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="mobile-nav-link"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                </motion.div>
            )}
        </nav>
    )
}

export default Navbar
