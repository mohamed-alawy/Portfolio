import React from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Calendar } from 'lucide-react'
import '../styles/Experience.css'

const experiences = [
    {
        title: 'AI Accessibility Assistant Developer',
        company: 'Yosr (Freelance)',
        period: '2025 - 2026',
        description: [
            'Built a custom YOLO model for real-time document and currency detection.',
            'Integrated Gemini-based AI for contextual understanding and text-to-speech feedback.',
            'Optimized the AI inference pipeline to achieve sub-2s real-time response.'
        ]
    },
    {
        title: 'Freelancing Trainee',
        company: 'ITIDA Gigs / EYouth',
        period: 'Jun - Sep 2025',
        description: [
            'Mastered freelancing essentials: profile setup, proposals, portfolio, and financial management.',
            'Enhanced communication and negotiation skills through expert sessions.',
            'Successfully obtained first freelance project during training.'
        ]
    },
    {
        title: 'AI Trainee',
        company: 'National Telecommunication Institute (NTI)',
        period: 'Aug 2025',
        description: [
            'Mastered core ML and AI concepts using Python.',
            'Developed and trained ML models for classification and prediction.',
            'Gained hands-on experience in Computer Vision and introductory NLP.'
        ]
    }
]

const Experience = () => {
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
                            key={index}
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
                                    {exp.description.map((item, i) => (
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
