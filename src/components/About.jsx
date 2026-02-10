import React from 'react'
import { motion } from 'framer-motion'
import '../styles/About.css'

const About = () => {
    return (
        <section id="about" className="about-section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="about-content"
                >
                    <h2 className="section-title">About Me</h2>
                    <div className="about-text">
                        <p>
                            I’m Mohamed Usama, an AI freelancer with over 7 years of freelance experience and 2+ years solving real-world AI problems.
                            I love turning challenging tasks into smart, practical solutions, whether it’s <strong>Computer Vision, NLP, RAG, or AI agents</strong>.
                        </p>
                        <p>
                            With a strong ability to understand clients quickly and communicate ideas clearly, I make sure every project flows smoothly from concept to delivery.
                            New challenges excite me - they push me to research, experiment, and deliver results that really work.
                        </p>
                        <p style={{ color: 'var(--primary)', fontWeight: '600' }}>
                            Let’s work together to bring your AI ideas to life. Drop me a message and let’s get started!
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default About
