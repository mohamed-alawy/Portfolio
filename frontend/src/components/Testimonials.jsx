import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import API_BASE from '../config'
import '../styles/Testimonials.css'

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([])

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const res = await fetch(`${API_BASE}/testimonials`)
                const data = await res.json()
                setTestimonials(data)
            } catch (err) {
                console.error("Failed to fetch testimonials", err)
            }
        }
        fetchTestimonials()
    }, [])

    if (testimonials.length === 0) return null

    // Helper to generate a consistent but "random" rotation based on index
    const getRotation = (index) => {
        const rotations = [-2, 1, 3, -1, 2, -3]
        return rotations[index % rotations.length]
    }

    return (
        <section id="testimonials" className="testimonials-section">
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="section-title"
                >
                    Client Feedback
                </motion.h2>

                <div className="testimonials-grid">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            className={`testimonial-card ${testimonial.language === 'ar' ? 'ar' : ''}`}
                            initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: getRotation(index) }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            style={{
                                transform: `rotate(${getRotation(index)}deg)`, // Fallback for CSS
                            }}
                        >
                            <div className="testimonial-header">
                                {testimonial.avatar_url ? (
                                    <img src={testimonial.avatar_url} alt={testimonial.name} className="testimonial-avatar" />
                                ) : (
                                    <div className="testimonial-avatar">
                                        {testimonial.name.charAt(0).toUpperCase()}
                                    </div>
                                )}
                                <div className="testimonial-info">
                                    <h4>{testimonial.name}</h4>
                                    <span className="testimonial-role">{testimonial.role}</span>
                                </div>
                            </div>

                            <div className="testimonial-rating">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={16}
                                        fill={i < testimonial.rating ? "currentColor" : "none"}
                                        strokeWidth={i < testimonial.rating ? 0 : 2}
                                        color={i < testimonial.rating ? "#ffc107" : "#ddd"}
                                    />
                                ))}
                            </div>

                            <p className="testimonial-content">"{testimonial.content}"</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Testimonials
