import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import '../styles/About.css'

import API_BASE from '../config'

const About = () => {
    const [content, setContent] = useState('')

    useEffect(() => {
        const fetchAbout = async () => {
            try {
                const res = await fetch(`${API_BASE}/about`)
                const data = await res.json()
                if (data && data.content) {
                    setContent(data.content)
                }
            } catch (err) {
                console.error('Failed to fetch about content', err)
            }
        }
        fetchAbout()
    }, [])

    if (!content) return null

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
                        <ReactMarkdown>{content}</ReactMarkdown>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default About
