import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Github, ExternalLink, Code } from 'lucide-react'
import { SkeletonHero } from './SkeletonLoader'
import '../styles/ProjectDetails.css'

import API_BASE, { getImageUrl } from '../config'

const ProjectDetails = () => {
    const { id } = useParams()
    const [project, setProject] = useState(null)
    const [loading, setLoading] = useState(true)
    const [selectedImage, setSelectedImage] = useState(null)

    useEffect(() => {
        window.scrollTo(0, 0)

        const fetchData = async () => {
            try {
                const res = await fetch(`${API_BASE}/projects/${id}`)
                if (!res.ok) throw new Error('Not found')
                const data = await res.json()
                setProject(data)

                // Preload at least the first gallery image if it exists
                if (data.image_urls && data.image_urls.length > 0) {
                    const firstImg = new Image()
                    firstImg.src = getImageUrl(data.image_urls[0])
                    await new Promise(resolve => {
                        firstImg.onload = resolve
                        firstImg.onerror = resolve
                    })
                }
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [id])

    if (loading) {
        return <SkeletonHero />
    }

    if (!project) {
        return (
            <div className="project-not-found">
                <h2>Project Not Found</h2>
                <Link to="/" className="btn btn-primary">Back to Home</Link>
            </div>
        )
    }

    // Build full image URLs
    const images = (project.image_urls || []).map(url => getImageUrl(url))

    return (
        <div className="project-details-page">
            <div className="container">
                <Link to="/" className="back-link">
                    <ArrowLeft size={20} /> Back to Projects
                </Link>

                <div className="sticky-project-nav">
                    <div className="sticky-nav-content">
                        <Link to="/" className="sticky-back">
                            <ArrowLeft size={24} />
                        </Link>
                        <span className="sticky-title">{project.title}</span>
                        <div className="sticky-actions">
                            {project.demo_link && (
                                <a href={project.demo_link} target="_blank" rel="noopener noreferrer" className="nav-btn">
                                    <ExternalLink size={18} />
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="project-header"
                >
                    <span className="project-category-badge">{project.category}</span>
                    <h1 className="project-title-large">{project.title}</h1>

                    <div className="project-actions">
                        {project.github_link && (
                            <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                                <Github size={20} /> GitHub Repo
                            </a>
                        )}
                        {project.demo_link && (
                            <a href={project.demo_link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                <ExternalLink size={20} /> {project.demo_label || 'Live Demo'}
                            </a>
                        )}
                    </div>
                </motion.div>

                <div className="project-content">
                    <div className="project-info">
                        <div className="description-section">
                            <h3>Overview</h3>
                            {project.full_description ? (
                                <div className="markdown-content">
                                    {project.full_description.split('\n').map((line, index) => {
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
                                {(project.tags || []).map(tag => (
                                    <span key={tag} className="tech-tag">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {images.length > 0 && (
                    <div className="project-gallery-section">
                        <h3>Project Gallery</h3>
                        <div className="project-gallery">
                            {images.map((img, index) => (
                                <div key={index} className="gallery-item" onClick={() => setSelectedImage(img)}>
                                    <img src={getImageUrl(img)} alt={`${project.title} screenshot ${index + 1}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Image Modal */}
                {selectedImage && (
                    <div className="image-modal" onClick={() => setSelectedImage(null)}>
                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                            <img src={getImageUrl(selectedImage)} alt="Project fullscreen" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProjectDetails
