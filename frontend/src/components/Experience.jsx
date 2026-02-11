import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Calendar } from 'lucide-react'
import '../styles/Experience.css'

import API_BASE from '../config'

const Experience = () => {
    const [experiences, setExperiences] = useState([])

    useEffect(() => {
        fetch(`${API_BASE}/experience`)
            .then(res => res.json())
            .then(data => setExperiences(data))
            .catch(err => console.error('Failed to fetch experiences', err))
    }, [])

    if (experiences.length === 0) return null

    return (
        <section id="experience" className="experience-section">
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="section-title"
                >
                    Professional Experience
                </motion.h2>

                <div className="timeline">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={exp.id || index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                        >
                            <div className="timeline-content">
                                <div className="timeline-header">
                                    <Briefcase size={20} className="icon" />
                                    <h3>{exp.title}</h3>
                                </div>
                                <h4 className="company-name">{exp.company}</h4>
                                <div className="period">
                                    <Calendar size={16} />
                                    <span>{exp.period}</span>
                                </div>
                                <ul className="description-list">
                                    {(exp.description || []).map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Experience
