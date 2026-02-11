import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Award, ExternalLink } from 'lucide-react'
import '../styles/Certifications.css'

const API_BASE = 'http://localhost:8000/api/v1'

const Certifications = () => {
    const [certifications, setCertifications] = useState([])

    useEffect(() => {
        fetch(`${API_BASE}/certifications`)
            .then(res => res.json())
            .then(data => setCertifications(data))
            .catch(err => console.error('Failed to fetch certifications', err))
    }, [])

    if (certifications.length === 0) return null

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
                            key={cert.id || index}
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
                                {cert.description && <p className="description">{cert.description}</p>}
                                {cert.link && (
                                    <a href={cert.link} target="_blank" rel="noopener noreferrer" className="verify-btn">
                                        Verify <ExternalLink size={14} />
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Certifications
