import React from 'react'
import { Github, Linkedin, Mail, FileText, MessageCircle } from 'lucide-react'
import '../styles/Footer.css'

const Footer = () => {
    return (
        <footer id="contact" className="footer">
            <div className="footer-container">
                <div className="footer-cta">
                    <h2>Ready to bring your AI ideas to life?</h2>
                    <p>Whether you need a custom Computer Vision model, an intelligent RAG system, or an autonomous agent, I'm here to help.</p>
                    <div className="cta-actions">
                        <a href="mailto:mohamed.alawy.21@gmail.com" className="btn btn-primary cta-btn">
                            <Mail size={20} /> Let's Work Together
                        </a>
                        <div className="footer-socials">
                            <a href="https://github.com/mohamed-alawy" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                <Github size={24} />
                            </a>
                            <a href="https://www.linkedin.com/in/mohamed-alawy/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <Linkedin size={24} />
                            </a>
                            <a href="https://wa.me/201009283969" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                                    <path d="M9 10a.5 .5 0 0 0 1 0V9a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
                                </svg>
                            </a>
                            <a href="mailto:mohamed.alawy.21@gmail.com" aria-label="Email">
                                <Mail size={24} />
                            </a>
                            <a href="https://drive.google.com/file/d/1RLbofdD-xzom2KSFTjKeGq6ztNg6u85A/view?usp=drive_link" target="_blank" rel="noopener noreferrer" aria-label="Resume/CV">
                                <FileText size={24} />
                            </a>
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
