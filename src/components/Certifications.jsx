import React from 'react'
import { motion } from 'framer-motion'
import { Award, ExternalLink } from 'lucide-react'
import '../styles/Certifications.css'

const certifications = [
    {
        title: 'ITIDA Gigs Freelancing Program (AI & Freelancing Skills)',
        issuer: 'ITIDA & EYouth',
        date: 'Jun 2025 - Sep 2025',
        link: 'https://media.licdn.com/dms/document/media/v2/D4E1FAQFsYjFFCVITbw/feedshare-document-sanitized-pdf/B4EZlo62TjKgA8-/0/1758401885950?e=1771369200&v=beta&t=hVfNXPy3JOYwGOM_cLlECqEg70slH55k93M1azk_NPM',
        description: 'Completed an intensive 3-month program covering freelancing essentials: profile setup, proposals, portfolio creation, and financial management. Successfully launched freelance career and obtained first gig.'
    },
    {
        title: 'AI Intern',
        issuer: 'National Telecommunication Institute (NTI)',
        date: 'Aug 2025 (1 mo)',
        link: 'https://media.licdn.com/dms/document/media/v2/D4E1FAQEERhbjpmEdow/feedshare-document-sanitized-pdf/B4EZjH3.z6GYBA-/0/1755700001402?e=1771369200&v=beta&t=oYGRvL5sWH6QYGd_Uh91GjIQxqFhWASmUKfc3ZegtBM',
        description: 'Completed an intensive AI training program, mastering core concepts of Artificial Intelligence, Machine Learning, Computer Vision, and NLP using Python. Developed classification and prediction models with real-world datasets.'
    }
]

const Certifications = () => {
    return (
        <section id="certifications" className="certifications-section">
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="section-title"
                >
                    Certifications
                </motion.h2>

                <div className="certifications-grid">
                    {certifications.map((cert, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="certification-card"
                        >
                            <div className="cert-icon">
                                <Award size={32} />
                            </div>
                            <div className="cert-content">
                                <h3>{cert.title}</h3>
                                <p className="issuer">{cert.issuer} • {cert.date}</p>
                                <p className="description">{cert.description}</p>
                                <a href={cert.link} target="_blank" rel="noopener noreferrer" className="verify-btn">
                                    Verify <ExternalLink size={14} />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Certifications
