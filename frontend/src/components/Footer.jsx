import React, { useState, useEffect } from 'react'
import { Github, Linkedin, Mail, FileText, Send, Phone, Twitter, MapPin } from 'lucide-react'
import '../styles/Footer.css'

import API_BASE from '../config'

const Footer = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' })
    const [sending, setSending] = useState(false)
    const [status, setStatus] = useState('')

    const [contactInfo, setContactInfo] = useState(null)
    const [cv, setCv] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [contactRes, cvRes] = await Promise.all([
                    fetch(`${API_BASE}/contact-info`),
                    fetch(`${API_BASE}/cv`)
                ])
                if (contactRes.ok) setContactInfo(await contactRes.json())
                if (cvRes.ok) setCv(await cvRes.json())
            } catch (err) {
                console.error("Failed to fetch footer data", err)
            }
        }
        fetchData()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!formData.name || !formData.email || !formData.message) return

        setSending(true)
        setStatus('')

        try {
            const res = await fetch(`${API_BASE}/contact/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (res.ok) {
                setStatus('success')
                setFormData({ name: '', email: '', message: '' })
            } else {
                setStatus('error')
            }
        } catch (err) {
            setStatus('error')
        } finally {
            setSending(false)
        }
    }

    return (
        <footer id="contact" className="footer">
            <div className="footer-container">
                <div className="footer-cta">
                    <h2>Ready to bring your AI ideas to life?</h2>
                    <p>Whether you need a custom Computer Vision model, an intelligent RAG system, or an autonomous agent, I'm here to help.</p>
                </div>

                <div className="footer-content-grid">
                    {/* Contact Form */}
                    <div className="contact-form-section">
                        <h3>Send me a message</h3>
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                            <textarea
                                placeholder="Your Message..."
                                rows={4}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                required
                            />
                            <button type="submit" className="btn btn-primary cta-btn" disabled={sending}>
                                <Send size={18} />
                                {sending ? 'Sending...' : 'Send Message'}
                            </button>
                            {status === 'success' && (
                                <p className="form-status success">Message sent successfully! I'll get back to you soon.</p>
                            )}
                            {status === 'error' && (
                                <p className="form-status error">Failed to send. Please try email directly.</p>
                            )}
                        </form>
                    </div>

                    {/* Quick Links */}
                    <div className="quick-links-section">
                        <h3>Connect with me</h3>
                        <div className="footer-socials-vertical">
                            {contactInfo?.email && (
                                <a href={`mailto:${contactInfo.email}`} className="social-link">
                                    <Mail size={20} /> {contactInfo.email}
                                </a>
                            )}
                            {contactInfo?.github && (
                                <a href={contactInfo.github} target="_blank" rel="noopener noreferrer" className="social-link">
                                    <Github size={20} /> GitHub
                                </a>
                            )}
                            {contactInfo?.linkedin && (
                                <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                                    <Linkedin size={20} /> LinkedIn
                                </a>
                            )}
                            {contactInfo?.whatsapp && (
                                <a href={`https://wa.me/${contactInfo.whatsapp.replace('+', '')}`} target="_blank" rel="noopener noreferrer" className="social-link">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                                        <path d="M9 10a.5 .5 0 0 0 1 0V9a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
                                    </svg>
                                    WhatsApp
                                </a>
                            )}
                            {contactInfo?.twitter && (
                                <a href={contactInfo.twitter} target="_blank" rel="noopener noreferrer" className="social-link">
                                    <Twitter size={20} /> Twitter
                                </a>
                            )}
                            {contactInfo?.phone && (
                                <a href={`tel:${contactInfo.phone}`} className="social-link">
                                    <Phone size={20} /> {contactInfo.phone}
                                </a>
                            )}
                            {contactInfo?.location && (
                                <div className="social-link" style={{ cursor: 'default' }}>
                                    <MapPin size={20} /> {contactInfo.location}
                                </div>
                            )}

                            {cv?.file_url && (
                                <a href={cv.file_url} target="_blank" rel="noopener noreferrer" className="social-link highlight-link">
                                    <FileText size={20} /> Resume / CV <span style={{ fontSize: '0.8em', opacity: 0.8 }}>({cv.updated_at})</span>
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Mohamed Alawy. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}


export default Footer
