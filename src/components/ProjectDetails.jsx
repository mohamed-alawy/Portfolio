import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Github, ExternalLink, Code } from 'lucide-react'
import { projects } from '../data/projects'
import '../styles/ProjectDetails.css'

const ProjectDetails = () => {
    const { id } = useParams()
    const project = projects.find(p => p.id === id)

    const [selectedImage, setSelectedImage] = useState(null)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    if (!project) {
        return (
            <div className="project-not-found">
                <h2>Project Not Found</h2>
                <Link to="/" className="btn btn-primary">Back to Home</Link>
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
                            <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                                <Github size={20} /> GitHub Repo
                            </a>
                        )}
                        {project.links.demo && (
                            <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                <ExternalLink size={20} /> {project.demoLabel || 'Live Demo'}
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
                    </div>

                    <div className="project-sidebar">
                        <div className="tech-stack-section">
                            <h3>Technologies Used</h3>
                            <div className="tech-tags">
                                {project.tags.map(tag => (
                                    <span key={tag} className="tech-tag">{tag}</span>
                                ))}
                            </div>
                        </div>

                        {/* Can add more sidebar items here later like links if we want to move them from header */}
                    </div>
                </div>

                {project.images && project.images.length > 0 && (
                    <div className="project-gallery-section">
                        <h3>Project Gallery</h3>
                        <div className="project-gallery">
                            {project.images.map((img, index) => (
                                <div key={index} className="gallery-item" onClick={() => setSelectedImage(img)}>
                                    <img src={img} alt={`${project.title} screenshot ${index + 1}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Image Modal */}
                {selectedImage && (
                    <div className="image-modal" onClick={() => setSelectedImage(null)}>
                        <div className="modal-content">
                            <img src={selectedImage} alt="Full size view" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProjectDetails
