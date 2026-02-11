import React from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, FileText } from 'lucide-react'
import '../styles/Hero.css'

import { getImageUrl } from '../config'

const heroImage = '/uploads/my_photo.png'

const Hero = () => {
    return (
        <section id="hero" className="hero-section loaded">
            <div className="hero-container">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="hero-content"
                >
                    <span className="hero-greeting">Hello, I'm</span>
                    <h1 className="hero-name">Mohamed Usama Alawy</h1>
                    <h2 className="hero-title">AI Engineer</h2>
                    <p className="hero-description">
                        Expert in <strong>Computer Vision, NLP, and RAG</strong> with 7+ years of freelance experience.
                        I build production-ready AI systems and autonomous agents that solve real-world problems.
                    </p>

                    <div className="hero-actions">
                        <a href="#projects" className="btn btn-primary">View My Work</a>
                        <a href="#contact" className="btn btn-outline">Contact Me</a>
                    </div>

                    <div className="hero-socials">
                        <a href="https://github.com/mohamed-alawy" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <Github size={24} />
                        </a>
                        <a href="https://www.linkedin.com/in/mohamed-alawy/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <Linkedin size={24} />
                        </a>
                        <a href="https://wa.me/201009283969" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                                <path d="M9 10a.5 .5 0 0 0 1 0V9a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
                            </svg>
                        </a>
                        <a href="mailto:mohamed.alawy.21@gmail.com" aria-label="Email">
                            <Mail size={24} />
                        </a>
                        <a href="https://drive.google.com/file/d/1RLbofdD-xzom2KSFTjKeGq6ztNg6u85A/view?usp=drive_link" target="_blank" rel="noopener noreferrer" aria-label="Resume/CV">
                            <FileText size={24} />
                        </a>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="hero-image-wrapper"
                >
                    <div className="hero-gradient-bg"></div>
                    <img
                        src={getImageUrl(heroImage)}
                        alt="Mohamed Alawy"
                        className="hero-img"
                    />
                </motion.div>
            </div>
        </section>
    )
}

export default Hero
