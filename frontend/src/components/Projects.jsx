import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ExternalLink, Github, Code, ArrowRight } from 'lucide-react'
import '../styles/Projects.css'

import API_BASE from '../config'

const Projects = () => {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        fetch(`${API_BASE}/projects/`)
            .then(res => res.json())
            .then(data => setProjects(data))
            .catch(err => console.error('Failed to fetch projects', err))
    }, [])

    return (
        <section id="projects" className="projects-section">
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="section-title"
                >
                    Featured Projects
                </motion.h2>

                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="project-card"
                        >
                            <div className="project-icon">
                                <Code size={40} strokeWidth={1.5} />
                            </div>
                            <Link to={`/project/${project.id}`} className="project-link-wrapper" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <h3 className="project-title">{project.title} <ArrowRight size={16} className="arrow-icon" /></h3>
                            </Link>
                            <p className="project-category">{project.category}</p>
                            <p className="project-description">
                                {project.description}
                                <Link to={`/project/${project.id}`} className="read-more-link" style={{ marginLeft: '5px', fontSize: '0.9rem', color: 'var(--primary)', fontWeight: '600' }}>
                                    Read More
                                </Link>
                            </p>

                            <div className="project-tags">
                                {(project.tags || []).map(tag => (
                                    <span key={tag} className="tag">{tag}</span>
                                ))}
                            </div>

                            <div className="project-links">
                                {project.github_link ? (
                                    <a href={project.github_link} className="link-btn" aria-label="GitHub Code" target="_blank" rel="noopener noreferrer">
                                        <Github size={18} /> Code
                                    </a>
                                ) : (
                                    <span className="link-btn disabled" style={{ opacity: 0.6, cursor: 'not-allowed', background: 'transparent', color: 'var(--text-muted)' }}>
                                        <Code size={18} /> Private
                                    </span>
                                )}

                                {project.demo_link && (
                                    <a href={project.demo_link} className="link-btn outline" aria-label={project.demo_label || "Live Demo"} target="_blank" rel="noopener noreferrer">
                                        <ExternalLink size={18} /> {project.demo_label || "Demo"}
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

export default Projects
