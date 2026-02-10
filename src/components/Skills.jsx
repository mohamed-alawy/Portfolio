import React from 'react'
import { motion } from 'framer-motion'
import { Cpu, Code, Eye, Brain, Cloud } from 'lucide-react'
import '../styles/Skills.css'

const skillCategories = [
    {
        name: 'Programming',
        icon: <Code size={24} />,
        skills: ['Python', 'C++', 'SQL']
    },
    {
        name: 'Machine Learning',
        icon: <Cpu size={24} />,
        skills: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'CNNs', 'Transfer Learning']
    },
    {
        name: 'Computer Vision',
        icon: <Eye size={24} />,
        skills: ['OpenCV', 'YOLO', 'MediaPipe', 'Object Detection', 'Segmentation']
    },
    {
        name: 'AI & NLP',
        icon: <Brain size={24} />,
        skills: ['Google Gemini', 'GPT APIs', 'RAG', 'OCR', 'Text Analysis']
    },
    {
        name: 'Backend & Tools',
        icon: <Cloud size={24} />,
        skills: ['FastAPI', 'Flask', 'Docker', 'Git']
    }
]

const Skills = () => {
    return (
        <section id="skills" className="skills-section">
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="section-title"
                >
                    Technical Skills
                </motion.h2>

                <div className="skills-grid">
                    {skillCategories.map((category, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="skill-category"
                        >
                            <div className="category-header">
                                <div className="category-icon">{category.icon}</div>
                                <h3>{category.name}</h3>
                            </div>
                            <div className="skills-list">
                                {category.skills.map(skill => (
                                    <span key={skill} className="skill-item">{skill}</span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Skills
