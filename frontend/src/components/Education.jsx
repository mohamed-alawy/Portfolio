import React from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, Calendar } from 'lucide-react'
import '../styles/Education.css'

const Education = () => {
    return (
        <section id="education" className="education-section">
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="section-title"
                >
                    Education
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="education-card"
                >
                    <div className="education-icon">
                        <GraduationCap size={40} strokeWidth={1.5} />
                    </div>
                    <div className="education-content">
                        <h3>Bachelor of Electrical and Computer Engineering</h3>
                        <div className="university-info">
                            <span className="university">Menofia University</span>
                            <span className="separator">|</span>
                            <span className="year"><Calendar size={16} /> Graduated: 2025</span>
                        </div>
                        <div className="gpa-badge">
                            GPA: 3.39/4.0
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default Education
