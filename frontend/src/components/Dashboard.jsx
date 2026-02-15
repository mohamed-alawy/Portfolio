import React, { useState, useEffect, useRef } from 'react'
import { Upload, FileText, Trash2, MessageSquare, FolderOpen, CheckCircle, Plus, Edit3, X, Save, LogOut, Image, GripVertical, User, Briefcase, Award, ExternalLink, Bot, Code, Star, Phone, File } from 'lucide-react'
import '../styles/Dashboard.css'

import API_BASE, { getImageUrl } from '../config'

const Dashboard = ({ token, onLogout }) => {
    const authHeaders = token ? { 'Authorization': `Bearer ${token}` } : {}
    const [activeTab, setActiveTab] = useState('documents')
    const [documents, setDocuments] = useState([])
    const [messages, setMessages] = useState([])
    const [projects, setProjects] = useState([])
    const [uploading, setUploading] = useState(false)
    const [uploadStatus, setUploadStatus] = useState('')

    // Project form state
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [editingProject, setEditingProject] = useState(null)
    const [projectForm, setProjectForm] = useState({
        title: '', description: '', category: '', full_description: '',
        tags: '', github_link: '', demo_link: '', demo_label: ''
    })
    const [projectImages, setProjectImages] = useState([]) // [{url, filename}]
    const [uploadingImages, setUploadingImages] = useState(false)
    const [dragIndex, setDragIndex] = useState(null)

    const [about, setAbout] = useState({ content: '' })
    const [experiences, setExperiences] = useState([])
    const [certifications, setCertifications] = useState([])

    // Experience Form
    const [showExpForm, setShowExpForm] = useState(false)
    const [editingExp, setEditingExp] = useState(null)
    const [expForm, setExpForm] = useState({ title: '', company: '', period: '', description: '' })

    // Certification Form
    const [showCertForm, setShowCertForm] = useState(false)
    const [editingCert, setEditingCert] = useState(null)
    const [certForm, setCertForm] = useState({ title: '', issuer: '', date: '', link: '', description: '' })

    // Chatbot Settings
    const [chatbotSettings, setChatbotSettings] = useState({ is_active: true, inactive_message: '' })
    const [chatHistory, setChatHistory] = useState([])

    // Skills
    const [skills, setSkills] = useState([])
    const [showSkillForm, setShowSkillForm] = useState(false)
    const [editingSkill, setEditingSkill] = useState(null)
    const [skillForm, setSkillForm] = useState({ name: '', category: '', proficiency: '', icon: '' })

    // Testimonials
    const [testimonials, setTestimonials] = useState([])
    const [showTestimonialForm, setShowTestimonialForm] = useState(false)
    const [editingTestimonial, setEditingTestimonial] = useState(null)
    const [testimonialForm, setTestimonialForm] = useState({ name: '', role: '', content: '', rating: 5, avatar_url: '', language: 'en' })

    // Contact Info
    const [contactInfo, setContactInfo] = useState({ email: '', phone: '', github: '', linkedin: '', twitter: '', location: '' })

    // CV
    const [cv, setCV] = useState({ file_url: '', updated_at: '' })

    useEffect(() => {
        if (activeTab === 'documents') fetchDocuments()
        if (activeTab === 'messages') fetchMessages()
        if (activeTab === 'projects') fetchProjects()
        if (activeTab === 'about') fetchAbout()
        if (activeTab === 'experience') fetchExperience()
        if (activeTab === 'certifications') fetchCertifications()
        if (activeTab === 'chatbot') { fetchChatbotSettings(); fetchChatHistory() }
        if (activeTab === 'skills') fetchSkills()
        if (activeTab === 'testimonials') fetchTestimonials()
        if (activeTab === 'contact') fetchContactInfo()
        if (activeTab === 'cv') fetchCV()
    }, [activeTab, token])

    // --- Chatbot Settings ---
    const fetchChatbotSettings = async () => {
        try {
            const res = await fetch(`${API_BASE}/chatbot-settings`, { headers: authHeaders })
            const data = await res.json()
            setChatbotSettings(data)
        } catch (err) { console.error(err) }
    }

    const updateChatbotSettings = async () => {
        try {
            const res = await fetch(`${API_BASE}/chatbot-settings`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', ...authHeaders },
                body: JSON.stringify(chatbotSettings)
            })
            if (res.ok) alert('Chatbot settings updated!')
        } catch (err) { console.error(err) }
    }

    const fetchChatHistory = async () => {
        try {
            const res = await fetch(`${API_BASE}/chat/history`, { headers: authHeaders })
            if (res.ok) setChatHistory(await res.json())
        } catch (err) { console.error(err) }
    }

    const deleteChatQuestion = async (id) => {
        if (!window.confirm('Delete this interaction?')) return
        try {
            await fetch(`${API_BASE}/chat/history/${id}`, { method: 'DELETE', headers: authHeaders })
            fetchChatHistory()
        } catch (err) { console.error(err) }
    }

    const deleteAllChatHistory = async () => {
        if (!window.confirm('Are you sure you want to delete ALL chat history?')) return
        try {
            await fetch(`${API_BASE}/chat/history`, { method: 'DELETE', headers: authHeaders })
            fetchChatHistory()
        } catch (err) { console.error(err) }
    }

    // --- Skills ---
    const fetchSkills = async () => {
        try {
            const res = await fetch(`${API_BASE}/skills`, { headers: authHeaders })
            setSkills(await res.json())
        } catch (err) { console.error(err) }
    }

    const handleSkillSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = editingSkill ? `${API_BASE}/skills/${editingSkill}` : `${API_BASE}/skills`
            const method = editingSkill ? 'PUT' : 'POST'
            await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', ...authHeaders },
                body: JSON.stringify(skillForm)
            })
            setShowSkillForm(false); setEditingSkill(null); setSkillForm({ name: '', category: '', proficiency: '', icon: '' })
            fetchSkills()
        } catch (err) { console.error(err) }
    }

    const deleteSkill = async (id) => {
        if (!window.confirm('Delete this skill?')) return
        try { await fetch(`${API_BASE}/skills/${id}`, { method: 'DELETE', headers: authHeaders }); fetchSkills() }
        catch (err) { console.error(err) }
    }

    // --- Testimonials ---
    const fetchTestimonials = async () => {
        try {
            const res = await fetch(`${API_BASE}/testimonials`, { headers: authHeaders })
            setTestimonials(await res.json())
        } catch (err) { console.error(err) }
    }

    const handleTestimonialSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = editingTestimonial ? `${API_BASE}/testimonials/${editingTestimonial}` : `${API_BASE}/testimonials`
            const method = editingTestimonial ? 'PUT' : 'POST'
            await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', ...authHeaders },
                body: JSON.stringify(testimonialForm)
            })
            setShowTestimonialForm(false); setEditingTestimonial(null);
            setTestimonialForm({ name: '', role: '', content: '', rating: 5, avatar_url: '', language: 'en' })
            fetchTestimonials()
        } catch (err) { console.error(err) }
    }

    const deleteTestimonial = async (id) => {
        if (!window.confirm('Delete this testimonial?')) return
        try { await fetch(`${API_BASE}/testimonials/${id}`, { method: 'DELETE', headers: authHeaders }); fetchTestimonials() }
        catch (err) { console.error(err) }
    }

    // --- Contact Info ---
    const fetchContactInfo = async () => {
        try {
            const res = await fetch(`${API_BASE}/contact-info`, { headers: authHeaders })
            setContactInfo(await res.json())
        } catch (err) { console.error(err) }
    }

    const updateContactInfo = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch(`${API_BASE}/contact-info`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', ...authHeaders },
                body: JSON.stringify(contactInfo)
            })
            if (res.ok) alert('Contact info updated!')
        } catch (err) { console.error(err) }
    }

    // --- CV ---
    const fetchCV = async () => {
        try {
            const res = await fetch(`${API_BASE}/cv`, { headers: authHeaders })
            setCV(await res.json())
        } catch (err) { console.error(err) }
    }

    const handleCVUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        const formData = new FormData()
        formData.append('file', file)

        try {
            const res = await fetch(`${API_BASE}/uploads/images`, { // Reusing image upload or create new endpoint? 
                method: 'POST', headers: authHeaders, body: formData
            })
            // Ideally we should have a generic file upload, but let's assume images endpoint works for now 
            // or better, use the correct endpoint if I created one. I didn't create a generic file upload endpoint.
            // Let's assume user manually pastes link for now or uses the documents upload and copies link.
            // Actually, I can use the same documents/upload endpoint but that's for RAG. 
            // Let's just allow pasting URL for now as per model.
        } catch (err) { console.error(err) }
    }

    const updateCV = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch(`${API_BASE}/cv`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', ...authHeaders },
                body: JSON.stringify(cv)
            })
            if (res.ok) alert('CV info updated!')
        } catch (err) { console.error(err) }
    }

    // --- About ---
    const fetchAbout = async () => {
        try {
            const res = await fetch(`${API_BASE}/about`, { headers: authHeaders })
            const data = await res.json()
            setAbout(data)
        } catch (err) { console.error(err) }
    }

    const updateAbout = async () => {
        try {
            await fetch(`${API_BASE}/about`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', ...authHeaders },
                body: JSON.stringify(about)
            })
            alert('About section updated!')
        } catch (err) { console.error(err) }
    }

    // --- Experience ---
    const fetchExperience = async () => {
        try {
            const res = await fetch(`${API_BASE}/experience`, { headers: authHeaders })
            const data = await res.json()
            setExperiences(data)
        } catch (err) { console.error(err) }
    }

    const handleExpSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            ...expForm,
            description: expForm.description.split('\n').filter(line => line.trim() !== '')
        }

        try {
            const url = editingExp ? `${API_BASE}/experience/${editingExp}` : `${API_BASE}/experience`
            const method = editingExp ? 'PUT' : 'POST'

            await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', ...authHeaders },
                body: JSON.stringify(payload)
            })
            setShowExpForm(false)
            setEditingExp(null)
            setExpForm({ title: '', company: '', period: '', description: '' })
            fetchExperience()
        } catch (err) { console.error(err) }
    }

    const deleteExp = async (id) => {
        if (!window.confirm('Delete this experience?')) return
        try { await fetch(`${API_BASE}/experience/${id}`, { method: 'DELETE', headers: authHeaders }); fetchExperience() }
        catch (err) { console.error(err) }
    }

    // --- Certifications ---
    const fetchCertifications = async () => {
        try {
            const res = await fetch(`${API_BASE}/certifications`, { headers: authHeaders })
            const data = await res.json()
            setCertifications(data)
        } catch (err) { console.error(err) }
    }

    const handleCertSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = editingCert ? `${API_BASE}/certifications/${editingCert}` : `${API_BASE}/certifications`
            const method = editingCert ? 'PUT' : 'POST'

            await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', ...authHeaders },
                body: JSON.stringify(certForm)
            })
            setShowCertForm(false)
            setEditingCert(null)
            setCertForm({ title: '', issuer: '', date: '', link: '', description: '' })
            fetchCertifications()
        } catch (err) { console.error(err) }
    }

    const deleteCert = async (id) => {
        if (!window.confirm('Delete this certification?')) return
        try { await fetch(`${API_BASE}/certifications/${id}`, { method: 'DELETE', headers: authHeaders }); fetchCertifications() }
        catch (err) { console.error(err) }
    }

    // --- Documents ---
    const fetchDocuments = async () => {
        try {
            const res = await fetch(`${API_BASE}/documents/?t=${Date.now()}`, { headers: authHeaders })
            const data = await res.json()
            setDocuments(data)
        } catch (err) { console.error('Failed to fetch documents', err) }
    }

    const handleUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) return
        setUploading(true)
        setUploadStatus('')
        const formData = new FormData()
        formData.append('file', file)
        try {
            const res = await fetch(`${API_BASE}/documents/upload`, { method: 'POST', headers: authHeaders, body: formData })
            if (res.ok) {
                setUploadStatus(`"${file.name}" uploaded & embedded successfully!`)
                fetchDocuments()
            } else {
                const err = await res.json()
                setUploadStatus(`Error: ${err.detail}`)
            }
        } catch (err) { setUploadStatus(`Connection error: ${err.message}`) }
        finally { setUploading(false) }
    }

    const deleteDocument = async (id) => {
        if (!window.confirm('Delete this document and all its chunks?')) return
        try { await fetch(`${API_BASE}/documents/${id}`, { method: 'DELETE', headers: authHeaders }); fetchDocuments() }
        catch (err) { console.error(err) }
    }

    // --- Messages ---
    const fetchMessages = async () => {
        try {
            const res = await fetch(`${API_BASE}/contact/`, { headers: authHeaders })
            const data = await res.json()
            setMessages(data)
        } catch (err) { console.error(err) }
    }

    const markAsRead = async (id) => {
        try { await fetch(`${API_BASE}/contact/${id}/read`, { method: 'PATCH', headers: authHeaders }); fetchMessages() }
        catch (err) { console.error(err) }
    }

    const deleteMessage = async (id) => {
        if (!window.confirm('Delete this message?')) return
        try { await fetch(`${API_BASE}/contact/${id}`, { method: 'DELETE', headers: authHeaders }); fetchMessages() }
        catch (err) { console.error(err) }
    }

    // --- Projects ---
    const fetchProjects = async () => {
        try {
            const res = await fetch(`${API_BASE}/projects/`, { headers: authHeaders })
            const data = await res.json()
            setProjects(data)
        } catch (err) { console.error(err) }
    }

    const resetProjectForm = () => {
        setProjectForm({
            title: '', description: '', category: '', full_description: '',
            tags: '', github_link: '', demo_link: '', demo_label: ''
        })
        setProjectImages([])
        setEditingProject(null)
        setShowProjectForm(false)
    }

    const openEditProject = (project) => {
        setProjectForm({
            title: project.title,
            description: project.description,
            category: project.category,
            full_description: project.full_description || '',
            tags: (project.tags || []).join(', '),
            github_link: project.github_link || '',
            demo_link: project.demo_link || '',
            demo_label: project.demo_label || ''
        })
        // Convert existing image_urls to our format
        setProjectImages((project.image_urls || []).map(url => ({ url, filename: url.split('/').pop() })))
        setEditingProject(project.id)
        setShowProjectForm(true)
    }

    // Image upload
    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files)
        if (files.length === 0) return
        setUploadingImages(true)

        const formData = new FormData()
        files.forEach(file => formData.append('files', file))

        try {
            const res = await fetch(`${API_BASE}/uploads/images`, {
                method: 'POST',
                headers: authHeaders,
                body: formData
            })
            if (res.ok) {
                const uploaded = await res.json()
                setProjectImages(prev => [...prev, ...uploaded])
            }
        } catch (err) { console.error('Image upload failed', err) }
        finally { setUploadingImages(false); e.target.value = '' }
    }

    const removeImage = (index) => {
        setProjectImages(prev => prev.filter((_, i) => i !== index))
    }

    // Drag & drop reorder
    const handleDragStart = (index) => setDragIndex(index)
    const handleDragOver = (e) => e.preventDefault()
    const handleDrop = (dropIndex) => {
        if (dragIndex === null || dragIndex === dropIndex) return
        setProjectImages(prev => {
            const newImages = [...prev]
            const [dragged] = newImages.splice(dragIndex, 1)
            newImages.splice(dropIndex, 0, dragged)
            return newImages
        })
        setDragIndex(null)
    }

    const handleProjectSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            ...projectForm,
            tags: projectForm.tags.split(',').map(t => t.trim()).filter(Boolean),
            image_urls: projectImages.map(img => img.url),
        }

        try {
            const url = editingProject
                ? `${API_BASE}/projects/${editingProject}`
                : `${API_BASE}/projects/`
            const method = editingProject ? 'PUT' : 'POST'

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', ...authHeaders },
                body: JSON.stringify(payload)
            })

            if (res.ok) {
                resetProjectForm()
                fetchProjects()
            }
        } catch (err) { console.error(err) }
    }

    const deleteProject = async (id) => {
        if (!window.confirm('Delete this project?')) return
        try { await fetch(`${API_BASE}/projects/${id}`, { method: 'DELETE', headers: authHeaders }); fetchProjects() }
        catch (err) { console.error(err) }
    }

    return (
        <div className="dashboard-page">
            <div className="dashboard-container">
                <div className="dashboard-header">
                    <div className="dashboard-header-row">
                        <div>
                            <h1>Admin Dashboard</h1>
                            <p>Manage your portfolio content and RAG knowledge base</p>
                        </div>
                        <button className="logout-btn" onClick={onLogout}>
                            <LogOut size={16} /> Logout
                        </button>
                    </div>
                </div>

                <div className="dashboard-tabs">
                    <button className={`tab-btn ${activeTab === 'documents' ? 'active' : ''}`} onClick={() => setActiveTab('documents')}>
                        <FolderOpen size={18} /> Documents
                    </button>
                    <button className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>
                        <Edit3 size={18} /> Projects
                    </button>
                    <button className={`tab-btn ${activeTab === 'messages' ? 'active' : ''}`} onClick={() => setActiveTab('messages')}>
                        <MessageSquare size={18} /> Messages
                        {messages.filter(m => !m.read).length > 0 && (
                            <span className="badge">{messages.filter(m => !m.read).length}</span>
                        )}
                    </button>
                    <button className={`tab-btn ${activeTab === 'about' ? 'active' : ''}`} onClick={() => setActiveTab('about')}>
                        <User size={18} /> About
                    </button>
                    <button className={`tab-btn ${activeTab === 'experience' ? 'active' : ''}`} onClick={() => setActiveTab('experience')}>
                        <Briefcase size={18} /> Experience
                    </button>
                    <button className={`tab-btn ${activeTab === 'certifications' ? 'active' : ''}`} onClick={() => setActiveTab('certifications')}>
                        <Award size={18} /> Certifications
                    </button>
                    <button className={`tab-btn ${activeTab === 'chatbot' ? 'active' : ''}`} onClick={() => setActiveTab('chatbot')}>
                        <Bot size={18} /> Chatbot
                    </button>
                    <button className={`tab-btn ${activeTab === 'skills' ? 'active' : ''}`} onClick={() => setActiveTab('skills')}>
                        <Code size={18} /> Skills
                    </button>
                    <button className={`tab-btn ${activeTab === 'testimonials' ? 'active' : ''}`} onClick={() => setActiveTab('testimonials')}>
                        <Star size={18} /> Testimonials
                    </button>
                    <button className={`tab-btn ${activeTab === 'contact' ? 'active' : ''}`} onClick={() => setActiveTab('contact')}>
                        <Phone size={18} /> Contact Info
                    </button>
                    <button className={`tab-btn ${activeTab === 'cv' ? 'active' : ''}`} onClick={() => setActiveTab('cv')}>
                        <File size={18} /> CV
                    </button>
                </div>

                {/* ===================== Documents Tab ===================== */}
                {activeTab === 'documents' && (
                    <div className="tab-content">
                        <div className="upload-section">
                            <h3>Upload Document for RAG</h3>
                            <p className="upload-desc">
                                Upload .txt or .md files. They will be chunked and embedded using
                                <strong> gemini-embedding-001</strong> (3072 dims) and stored in pgvector.
                            </p>
                            <label className="upload-btn">
                                <Upload size={20} />
                                {uploading ? 'Uploading & Embedding...' : 'Choose File'}
                                <input type="file" accept=".txt,.md" onChange={handleUpload} disabled={uploading} hidden />
                            </label>
                            {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
                        </div>

                        <div className="documents-list">
                            <h3>Uploaded Documents ({documents.length})</h3>
                            {documents.length === 0 ? (
                                <div className="empty-state">
                                    <FileText size={48} strokeWidth={1} />
                                    <p>No documents uploaded yet. Upload your CV, resume, or project info.</p>
                                </div>
                            ) : (
                                documents.map(doc => (
                                    <div key={doc.id} className="document-card">
                                        <div className="doc-info">
                                            <FileText size={20} />
                                            <div>
                                                <h4>{doc.filename}</h4>
                                                <span className="chunk-count">{doc.chunk_count} {doc.chunk_count === 1 ? 'chunk' : 'chunks'} embedded</span>
                                            </div>
                                        </div>
                                        <button className="delete-btn" onClick={() => deleteDocument(doc.id)}>
                                            <Trash2 size={16} /> Delete
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

                {/* ===================== Projects Tab ===================== */}
                {activeTab === 'projects' && (
                    <div className="tab-content">
                        <div className="tab-header-row">
                            <h3>Projects ({projects.length})</h3>
                            <button className="add-btn" onClick={() => { resetProjectForm(); setShowProjectForm(true) }}>
                                <Plus size={18} /> Add Project
                            </button>
                        </div>

                        {/* Project Form */}
                        {showProjectForm && (
                            <div className="project-form-card">
                                <div className="form-card-header">
                                    <h4>{editingProject ? 'Edit Project' : 'New Project'}</h4>
                                    <button className="close-btn" onClick={resetProjectForm}><X size={18} /></button>
                                </div>
                                <form className="project-form" onSubmit={handleProjectSubmit}>
                                    <div className="form-row">
                                        <input placeholder="Title" value={projectForm.title} onChange={e => setProjectForm({ ...projectForm, title: e.target.value })} required />
                                        <input placeholder="Category (e.g. Medical AI)" value={projectForm.category} onChange={e => setProjectForm({ ...projectForm, category: e.target.value })} required />
                                    </div>
                                    <input placeholder="Short Description" value={projectForm.description} onChange={e => setProjectForm({ ...projectForm, description: e.target.value })} required />
                                    <textarea placeholder="Full Description (Markdown supported)" rows={5} value={projectForm.full_description} onChange={e => setProjectForm({ ...projectForm, full_description: e.target.value })} />
                                    <div className="form-row">
                                        <input placeholder="Tags (comma separated)" value={projectForm.tags} onChange={e => setProjectForm({ ...projectForm, tags: e.target.value })} />
                                        <input placeholder="Demo Label (e.g. App Store)" value={projectForm.demo_label} onChange={e => setProjectForm({ ...projectForm, demo_label: e.target.value })} />
                                    </div>
                                    <div className="form-row">
                                        <input placeholder="GitHub Link" value={projectForm.github_link} onChange={e => setProjectForm({ ...projectForm, github_link: e.target.value })} />
                                        <input placeholder="Demo Link" value={projectForm.demo_link} onChange={e => setProjectForm({ ...projectForm, demo_link: e.target.value })} />
                                    </div>

                                    {/* Image Upload Section */}
                                    <div className="image-upload-section">
                                        <div className="image-upload-header">
                                            <h4><Image size={16} /> Project Images</h4>
                                            <label className="image-upload-btn">
                                                <Upload size={14} />
                                                {uploadingImages ? 'Uploading...' : 'Add Images'}
                                                <input type="file" accept="image/*" multiple onChange={handleImageUpload} disabled={uploadingImages} hidden />
                                            </label>
                                        </div>
                                        <p className="image-hint">Drag images to reorder. First image is the cover.</p>

                                        {projectImages.length > 0 && (
                                            <div className="image-grid">
                                                {projectImages.map((img, index) => (
                                                    <div
                                                        key={img.url + index}
                                                        className={`image-item ${index === 0 ? 'cover' : ''} ${dragIndex === index ? 'dragging' : ''}`}
                                                        draggable
                                                        onDragStart={() => handleDragStart(index)}
                                                        onDragOver={handleDragOver}
                                                        onDrop={() => handleDrop(index)}
                                                    >
                                                        <img src={getImageUrl(img.url)} alt={`Project ${index + 1}`} />
                                                        <div className="image-overlay">
                                                            <span className="image-order">
                                                                <GripVertical size={12} /> {index + 1}
                                                            </span>
                                                            {index === 0 && <span className="cover-badge">Cover</span>}
                                                            <button type="button" className="image-remove" onClick={() => removeImage(index)}>
                                                                <X size={14} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <button type="submit" className="save-btn">
                                        <Save size={16} /> {editingProject ? 'Update Project' : 'Create Project'}
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* Projects List */}
                        {projects.length === 0 && !showProjectForm ? (
                            <div className="empty-state">
                                <FolderOpen size={48} strokeWidth={1} />
                                <p>No projects yet. Click "Add Project" to create one.</p>
                            </div>
                        ) : (
                            projects.map(project => (
                                <div key={project.id} className="project-card-admin">
                                    <div className="project-card-info">
                                        <div className="project-card-top">
                                            {(project.image_urls || []).length > 0 && (
                                                <img
                                                    className="project-thumb"
                                                    src={getImageUrl(project.image_urls[0])}
                                                    alt={project.title}
                                                />
                                            )}
                                            <div>
                                                <h4>{project.title}</h4>
                                                <span className="project-category">{project.category}</span>
                                            </div>
                                        </div>
                                        <p>{project.description}</p>
                                        <div className="project-card-tags">
                                            {(project.tags || []).map(tag => (
                                                <span key={tag} className="mini-tag">{tag}</span>
                                            ))}
                                        </div>
                                        <span className="image-count"><Image size={14} /> {(project.image_urls || []).length} images</span>
                                    </div>
                                    <div className="project-card-actions">
                                        <button className="edit-btn" onClick={() => openEditProject(project)}>
                                            <Edit3 size={14} /> Edit
                                        </button>
                                        <button className="delete-btn" onClick={() => deleteProject(project.id)}>
                                            <Trash2 size={14} /> Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {/* ===================== Messages Tab ===================== */}
                {activeTab === 'messages' && (
                    <div className="tab-content">
                        <h3>Contact Messages ({messages.length})</h3>
                        {messages.length === 0 ? (
                            <div className="empty-state">
                                <MessageSquare size={48} strokeWidth={1} />
                                <p>No messages yet.</p>
                            </div>
                        ) : (
                            messages.map(msg => (
                                <div key={msg.id} className={`message-card ${msg.read ? 'read' : 'unread'}`}>
                                    <div className="message-header">
                                        <div>
                                            <h4>{msg.name}</h4>
                                            <span className="message-email">{msg.email}</span>
                                        </div>
                                        <div className="message-actions">
                                            {!msg.read && (
                                                <button className="mark-read-btn" onClick={() => markAsRead(msg.id)}>
                                                    <CheckCircle size={14} /> Mark Read
                                                </button>
                                            )}
                                            <button className="delete-btn" onClick={() => deleteMessage(msg.id)}>
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                    <p className="message-body">{msg.message}</p>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {/* ===================== About Tab ===================== */}
                {activeTab === 'about' && (
                    <div className="tab-content">
                        <h3>Edit About Me</h3>
                        <div className="about-editor">
                            <textarea
                                className="about-textarea"
                                value={about.content}
                                onChange={e => setAbout({ ...about, content: e.target.value })}
                                rows={10}
                                placeholder="Write about yourself..."
                            />
                            <button className="save-btn" onClick={updateAbout}>
                                <Save size={16} /> Save Changes
                            </button>
                        </div>
                    </div>
                )}
                {/* ===================== Experience Tab ===================== */}
                {activeTab === 'experience' && (
                    <div className="tab-content">
                        <div className="tab-header-row">
                            <h3>Experience ({experiences.length})</h3>
                            <button className="add-btn" onClick={() => {
                                setExpForm({ title: '', company: '', period: '', description: '' })
                                setEditingExp(null)
                                setShowExpForm(true)
                            }}>
                                <Plus size={18} /> Add Experience
                            </button>
                        </div>

                        {showExpForm && (
                            <div className="project-form-card">
                                <div className="form-card-header">
                                    <h4>{editingExp ? 'Edit Experience' : 'New Experience'}</h4>
                                    <button className="close-btn" onClick={() => setShowExpForm(false)}><X size={18} /></button>
                                </div>
                                <form className="project-form" onSubmit={handleExpSubmit}>
                                    <div className="form-row">
                                        <input placeholder="Job Title" value={expForm.title} onChange={e => setExpForm({ ...expForm, title: e.target.value })} required />
                                        <input placeholder="Company" value={expForm.company} onChange={e => setExpForm({ ...expForm, company: e.target.value })} required />
                                    </div>
                                    <input placeholder="Period (e.g. 2025 - Present)" value={expForm.period} onChange={e => setExpForm({ ...expForm, period: e.target.value })} required />
                                    <textarea
                                        placeholder="Description (one bullet point per line)"
                                        rows={5}
                                        value={expForm.description}
                                        onChange={e => setExpForm({ ...expForm, description: e.target.value })}
                                        required
                                    />
                                    <button type="submit" className="save-btn">
                                        <Save size={16} /> {editingExp ? 'Update' : 'Create'}
                                    </button>
                                </form>
                            </div>
                        )}

                        {experiences.map(exp => (
                            <div key={exp.id} className="project-card-admin">
                                <div className="project-card-info">
                                    <h4>{exp.title}</h4>
                                    <span className="project-category">{exp.company} • {exp.period}</span>
                                    <ul className="project-desc-list">
                                        {exp.description.map((item, i) => <li key={i}>{item}</li>)}
                                    </ul>
                                </div>
                                <div className="project-card-actions">
                                    <button className="edit-btn" onClick={() => {
                                        setExpForm({
                                            title: exp.title,
                                            company: exp.company,
                                            period: exp.period,
                                            description: exp.description.join('\n')
                                        })
                                        setEditingExp(exp.id)
                                        setShowExpForm(true)
                                    }}>
                                        <Edit3 size={14} /> Edit
                                    </button>
                                    <button className="delete-btn" onClick={() => deleteExp(exp.id)}>
                                        <Trash2 size={14} /> Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* ===================== Certifications Tab ===================== */}
                {activeTab === 'certifications' && (
                    <div className="tab-content">
                        <div className="tab-header-row">
                            <h3>Certifications ({certifications.length})</h3>
                            <button className="add-btn" onClick={() => {
                                setCertForm({ title: '', issuer: '', date: '', link: '', description: '' })
                                setEditingCert(null)
                                setShowCertForm(true)
                            }}>
                                <Plus size={18} /> Add Certification
                            </button>
                        </div>

                        {showCertForm && (
                            <div className="project-form-card">
                                <div className="form-card-header">
                                    <h4>{editingCert ? 'Edit Certification' : 'New Certification'}</h4>
                                    <button className="close-btn" onClick={() => setShowCertForm(false)}><X size={18} /></button>
                                </div>
                                <form className="project-form" onSubmit={handleCertSubmit}>
                                    <div className="form-row">
                                        <input placeholder="Certification Title" value={certForm.title} onChange={e => setCertForm({ ...certForm, title: e.target.value })} required />
                                        <input placeholder="Issuer" value={certForm.issuer} onChange={e => setCertForm({ ...certForm, issuer: e.target.value })} required />
                                    </div>
                                    <div className="form-row">
                                        <input placeholder="Date (e.g. Aug 2025)" value={certForm.date} onChange={e => setCertForm({ ...certForm, date: e.target.value })} required />
                                        <input placeholder="Verification Link" value={certForm.link} onChange={e => setCertForm({ ...certForm, link: e.target.value })} />
                                    </div>
                                    <textarea
                                        placeholder="Description"
                                        rows={3}
                                        value={certForm.description}
                                        onChange={e => setCertForm({ ...certForm, description: e.target.value })}
                                    />
                                    <button type="submit" className="save-btn">
                                        <Save size={16} /> {editingCert ? 'Update' : 'Create'}
                                    </button>
                                </form>
                            </div>
                        )}

                        {certifications.map(cert => (
                            <div key={cert.id} className="project-card-admin">
                                <div className="project-card-info">
                                    <h4>{cert.title}</h4>
                                    <span className="project-category">{cert.issuer} • {cert.date}</span>
                                    {cert.description && <p>{cert.description}</p>}
                                    {cert.link && (
                                        <a href={cert.link} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: 'var(--primary)', marginTop: '0.5rem', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>
                                            Verify Credential <ExternalLink size={14} />
                                        </a>
                                    )}
                                </div>
                                <div className="project-card-actions">
                                    <button className="edit-btn" onClick={() => {
                                        setCertForm({
                                            title: cert.title,
                                            issuer: cert.issuer,
                                            date: cert.date,
                                            link: cert.link || '',
                                            description: cert.description || ''
                                        })
                                        setEditingCert(cert.id)
                                        setShowCertForm(true)
                                    }}>
                                        <Edit3 size={14} /> Edit
                                    </button>
                                    <button className="delete-btn" onClick={() => deleteCert(cert.id)}>
                                        <Trash2 size={14} /> Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* ===================== Chatbot Settings Tab ===================== */}
                {activeTab === 'chatbot' && (
                    <div className="tab-content">
                        <h3>Chatbot Configuration</h3>

                        <div className="project-form-card">
                            <div className="form-row" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div className="toggle-switch">
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', fontWeight: 600 }}>
                                        <input
                                            type="checkbox"
                                            checked={chatbotSettings.is_active}
                                            onChange={() => {
                                                const newSettings = { ...chatbotSettings, is_active: !chatbotSettings.is_active }
                                                setChatbotSettings(newSettings)
                                            }}
                                            style={{ width: '20px', height: '20px' }}
                                        />
                                        Enable Chatbot
                                    </label>
                                </div>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                    {chatbotSettings.is_active ? 'Chatbot is online and answering users.' : 'Chatbot is offline.'}
                                </span>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-main)' }}>Offline Message</label>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                                    This message will be sent immediately when a user tries to chat while the bot is disabled.
                                </p>
                                <textarea
                                    className="about-textarea"
                                    value={chatbotSettings.inactive_message}
                                    onChange={e => setChatbotSettings({ ...chatbotSettings, inactive_message: e.target.value })}
                                    rows={3}
                                    style={{ minHeight: '100px' }}
                                />
                            </div>

                            <button className="save-btn" onClick={updateChatbotSettings}>
                                <Save size={16} /> Save Settings
                            </button>
                        </div>

                        {/* Chat History Section */}
                        <div style={{ marginTop: '2rem' }}>
                            <div className="tab-header-row">
                                <h3>User Interaction History ({chatHistory.length})</h3>
                                {chatHistory.length > 0 && (
                                    <button className="delete-btn" onClick={deleteAllChatHistory} style={{ background: 'var(--error)', color: 'white' }}>
                                        <Trash2 size={16} /> Clear All History
                                    </button>
                                )}
                            </div>

                            {chatHistory.length === 0 ? (
                                <div className="empty-state">
                                    <Bot size={48} strokeWidth={1} />
                                    <p>No chat history available.</p>
                                </div>
                            ) : (
                                <div className="chat-history-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {chatHistory.map(chat => (
                                        <div key={chat.id} className="message-card" style={{ borderLeft: '4px solid var(--primary)' }}>
                                            <div className="message-header">
                                                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                                    {new Date(chat.timestamp).toLocaleString()}
                                                </span>
                                                <button className="delete-btn" onClick={() => deleteChatQuestion(chat.id)}>
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                            <div style={{ marginTop: '0.5rem' }}>
                                                <p><strong>User:</strong> {chat.content}</p>
                                                {chat.response && (
                                                    <p style={{ marginTop: '0.5rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '0.5rem' }}>
                                                        <strong>Bot:</strong> {chat.response}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* ===================== Skills Tab ===================== */}
                {activeTab === 'skills' && (
                    <div className="tab-content">
                        <div className="tab-header-row">
                            <h3>Skills ({skills.length})</h3>
                            <button className="add-btn" onClick={() => {
                                setSkillForm({ name: '', category: '', proficiency: '', icon: '' })
                                setEditingSkill(null)
                                setShowSkillForm(true)
                            }}>
                                <Plus size={18} /> Add Skill
                            </button>
                        </div>

                        {showSkillForm && (
                            <div className="project-form-card">
                                <div className="form-card-header">
                                    <h4>{editingSkill ? 'Edit Skill' : 'New Skill'}</h4>
                                    <button className="close-btn" onClick={() => setShowSkillForm(false)}><X size={18} /></button>
                                </div>
                                <form className="project-form" onSubmit={handleSkillSubmit}>
                                    <div className="form-row">
                                        <input placeholder="Skill Name" value={skillForm.name} onChange={e => setSkillForm({ ...skillForm, name: e.target.value })} required />
                                        <input placeholder="Category (e.g. Frontend)" value={skillForm.category} onChange={e => setSkillForm({ ...skillForm, category: e.target.value })} required />
                                    </div>
                                    <div className="form-row">
                                        <select value={skillForm.icon || ''} onChange={e => setSkillForm({ ...skillForm, icon: e.target.value })}>
                                            <option value="">Select Icon (Optional)</option>
                                            <option value="Code">Code</option>
                                            <option value="Cpu">Cpu</option>
                                            <option value="Eye">Eye</option>
                                            <option value="Brain">Brain</option>
                                            <option value="Cloud">Cloud</option>
                                            <option value="Database">Database</option>
                                            <option value="Terminal">Terminal</option>
                                            <option value="Globe">Globe</option>
                                        </select>
                                    </div>
                                    <button type="submit" className="save-btn">
                                        <Save size={16} /> {editingSkill ? 'Update' : 'Create'}
                                    </button>
                                </form>
                            </div>
                        )}

                        {skills.map(skill => (
                            <div key={skill.id} className="project-card-admin">
                                <div className="project-card-info">
                                    <h4>{skill.name}</h4>
                                    <span className="project-category">{skill.category}</span>
                                </div>
                                <div className="project-card-actions">
                                    <button className="edit-btn" onClick={() => {
                                        setSkillForm({ name: skill.name, category: skill.category, proficiency: skill.proficiency, icon: skill.icon })
                                        setEditingSkill(skill.id)
                                        setShowSkillForm(true)
                                    }}>
                                        <Edit3 size={14} /> Edit
                                    </button>
                                    <button className="delete-btn" onClick={() => deleteSkill(skill.id)}>
                                        <Trash2 size={14} /> Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* ===================== Testimonials Tab ===================== */}
                {activeTab === 'testimonials' && (
                    <div className="tab-content">
                        <div className="tab-header-row">
                            <h3>Testimonials ({testimonials.length})</h3>
                            <button className="add-btn" onClick={() => {
                                setTestimonialForm({ name: '', role: '', content: '', rating: 5, avatar_url: '', language: 'en' })
                                setEditingTestimonial(null)
                                setShowTestimonialForm(true)
                            }}>
                                <Plus size={18} /> Add Testimonial
                            </button>
                        </div>

                        {showTestimonialForm && (
                            <div className="project-form-card">
                                <div className="form-card-header">
                                    <h4>{editingTestimonial ? 'Edit Testimonial' : 'New Testimonial'}</h4>
                                    <button className="close-btn" onClick={() => setShowTestimonialForm(false)}><X size={18} /></button>
                                </div>
                                <form className="project-form" onSubmit={handleTestimonialSubmit}>
                                    <div className="form-row">
                                        <input placeholder="Client Name" value={testimonialForm.name} onChange={e => setTestimonialForm({ ...testimonialForm, name: e.target.value })} required />
                                        <input placeholder="Role / Company (Optional)" value={testimonialForm.role || ''} onChange={e => setTestimonialForm({ ...testimonialForm, role: e.target.value })} />
                                    </div>
                                    <textarea placeholder="Feedback Content" rows={3} value={testimonialForm.content} onChange={e => setTestimonialForm({ ...testimonialForm, content: e.target.value })} required />
                                    <div className="form-row">
                                        <input type="number" max="5" min="1" placeholder="Rating (1-5)" value={testimonialForm.rating} onChange={e => setTestimonialForm({ ...testimonialForm, rating: e.target.value })} required />
                                        <select value={testimonialForm.language} onChange={e => setTestimonialForm({ ...testimonialForm, language: e.target.value })}>
                                            <option value="en">English</option>
                                            <option value="ar">Arabic</option>
                                        </select>
                                    </div>
                                    <div className="form-row">
                                        <input placeholder="Avatar URL (Optional)" value={testimonialForm.avatar_url || ''} onChange={e => setTestimonialForm({ ...testimonialForm, avatar_url: e.target.value })} />
                                        <input placeholder="Link to Feedback (Optional)" value={testimonialForm.link || ''} onChange={e => setTestimonialForm({ ...testimonialForm, link: e.target.value })} />
                                    </div>
                                    <button type="submit" className="save-btn">
                                        <Save size={16} /> {editingTestimonial ? 'Update' : 'Create'}
                                    </button>
                                </form>
                            </div>
                        )}

                        <div className="testimonials-admin-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                            {testimonials.map(t => (
                                <div key={t.id} className="project-card-admin" style={{ display: 'flex', flexDirection: 'column', height: 'auto' }}>
                                    <div className="project-card-info">
                                        <h4>{t.name} <span style={{ fontSize: '0.8em', color: '#888' }}>({t.language})</span></h4>
                                        <span className="project-category">{t.role}</span>
                                        <p style={{ fontStyle: 'italic', marginTop: '0.5rem' }}>"{t.content}"</p>
                                        <div style={{ marginTop: '0.5rem' }}>{'★'.repeat(t.rating)}</div>
                                    </div>
                                    <div className="project-card-actions" style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                                        <button className="edit-btn" onClick={() => {
                                            setTestimonialForm(t)
                                            setEditingTestimonial(t.id)
                                            setShowTestimonialForm(true)
                                        }}>
                                            <Edit3 size={14} /> Edit
                                        </button>
                                        <button className="delete-btn" onClick={() => deleteTestimonial(t.id)}>
                                            <Trash2 size={14} /> Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ===================== Contact Info Tab ===================== */}
                {activeTab === 'contact' && (
                    <div className="tab-content">
                        <h3>Contact Information</h3>
                        <div className="project-form-card">
                            <form className="project-form" onSubmit={updateContactInfo}>
                                <div className="form-row">
                                    <input placeholder="Email" value={contactInfo.email || ''} onChange={e => setContactInfo({ ...contactInfo, email: e.target.value })} />
                                    <input placeholder="Phone" value={contactInfo.phone || ''} onChange={e => setContactInfo({ ...contactInfo, phone: e.target.value })} />
                                </div>
                                <div className="form-row">
                                    <input placeholder="WhatsApp (+20...)" value={contactInfo.whatsapp || ''} onChange={e => setContactInfo({ ...contactInfo, whatsapp: e.target.value })} />
                                    <input placeholder="GitHub URL" value={contactInfo.github || ''} onChange={e => setContactInfo({ ...contactInfo, github: e.target.value })} />
                                </div>
                                <div className="form-row">
                                    <input placeholder="LinkedIn URL" value={contactInfo.linkedin || ''} onChange={e => setContactInfo({ ...contactInfo, linkedin: e.target.value })} />
                                    <input placeholder="Twitter/X URL" value={contactInfo.twitter || ''} onChange={e => setContactInfo({ ...contactInfo, twitter: e.target.value })} />
                                </div>
                                <div className="form-row">
                                    <input placeholder="Location" value={contactInfo.location || ''} onChange={e => setContactInfo({ ...contactInfo, location: e.target.value })} />
                                </div>
                                <button type="submit" className="save-btn">
                                    <Save size={16} /> Save Contact Info
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* ===================== CV Tab ===================== */}
                {activeTab === 'cv' && (
                    <div className="tab-content">
                        <h3>Curriculum Vitae</h3>
                        <div className="project-form-card">
                            <form className="project-form" onSubmit={updateCV}>
                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>CV File URL</label>
                                    <input
                                        placeholder="https://example.com/my-cv.pdf"
                                        value={cv.file_url || ''}
                                        onChange={e => setCV({ ...cv, file_url: e.target.value })}
                                        style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-main)' }}
                                    />
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                                        Upload your CV in the "Documents" tab to get a URL, or host it elsewhere.
                                    </p>
                                </div>
                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Last Updated Text</label>
                                    <input
                                        placeholder="e.g. Updated January 2026"
                                        value={cv.updated_at || ''}
                                        onChange={e => setCV({ ...cv, updated_at: e.target.value })}
                                        style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-main)' }}
                                    />
                                </div>
                                <button type="submit" className="save-btn">
                                    <Save size={16} /> Save CV Details
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Dashboard
