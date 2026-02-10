import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Github, ExternalLink, Code } from 'lucide-react'
import { projects } from '../data/projects'
import '../styles/ProjectDetails.css'

const ProjectDetails = () => {
    const { id } = useParams()
    const project = projects.find(p => p.id === id)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    if (!project) {
        return (
            <div className="project-not-found">
                <h2>Project Not Found</h2>
                <Link to="/" className="back-link">
                    <ArrowLeft size={20} /> Back to Home
                </Link>
            </div>
        )
    }

    return (
        <div className="project-details-page">
            <div className="container">
                <Link to="/" className="back-link">
                    <ArrowLeft size={20} /> Back to Projects
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="project-header"
                >
                    <span className="project-category-badge">{project.category}</span>
                    <h1 className="project-title-large">{project.title}</h1>

                    <div className="project-actions">
                        {project.links.github && (
                            <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                <Github size={20} /> View Code
                            </a>
                        )}
                        {project.links.demo && (
                            <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                                <ExternalLink size={20} /> {project.demoLabel || "Live Demo"}
                            </a>
                        )}
                    </div>
                </motion.div>

                <div className="project-content">
                    <div className="project-info">
                        <div className="description-section">
                            <h3>Overview</h3>
                            {project.fullDescription ? (
                                <div className="markdown-content">
                                    {project.fullDescription.split('\n').map((line, index) => {
                                        const renderContent = (text) => {
                                            const parts = text.split(/(\*\*.*?\*\*)/g)
                                            return parts.map((part, i) => {
                                                if (part.startsWith('**') && part.endsWith('**')) {
                                                    return <strong key={i}>{part.slice(2, -2)}</strong>
                                                }
                                                return part
                                            })
                                        }

                                        if (line.trim().startsWith('###')) {
                                            return <h4 key={index}>{renderContent(line.replace('###', '').trim())}</h4>
                                        } else if (line.trim().startsWith('-')) {
                                            return <li key={index}>{renderContent(line.replace('-', '').trim())}</li>
                                        } else if (line.trim() === '') {
                                            return <br key={index} />
                                        } else {
                                            return <p key={index}>{renderContent(line)}</p>
                                        }
                                    })}
                                </div>
                            ) : (
                                <p>{project.description}</p>
                            )}
                        </div>

                        <div className="tech-stack-section">
                            <h3>Technologies Used</h3>
                            <div className="tech-tags">
                                {project.tags.map(tag => (
                                    <span key={tag} className="tech-tag">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="project-gallery">
                        {project.images && project.images.length > 0 ? (
                            project.images.map((img, index) => (
                                <div key={index} className="gallery-item">
                                    <img src={img} alt={`${project.title} screenshot ${index + 1}`} />
                                </div>
                            ))
                        ) : (
                            <div className="gallery-placeholder">
                                <Code size={60} strokeWidth={1} />
                                <p>Project Screenshots Coming Soon</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectDetails
