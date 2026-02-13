import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Cpu, Code, Eye, Brain, Cloud, Database, Terminal, Globe } from 'lucide-react'
import API_BASE from '../config'
import '../styles/Skills.css'

const iconMap = {
    'Code': <Code size={24} />,
    'Cpu': <Cpu size={24} />,
    'Eye': <Eye size={24} />,
    'Brain': <Brain size={24} />,
    'Cloud': <Cloud size={24} />,
    'Database': <Database size={24} />,
    'Terminal': <Terminal size={24} />,
    'Globe': <Globe size={24} />
}

const Skills = () => {
    const [skillsData, setSkillsData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const res = await fetch(`${API_BASE}/skills`)
                if (!res.ok) throw new Error('Failed to fetch skills')

                const data = await res.json()

                if (!Array.isArray(data)) {
                    console.warn("Skills data is not an array, setting empty:", data)
                    setSkillsData([])
                    return
                }

                // Group by category
                const grouped = data.reduce((acc, skill) => {
                    if (!acc[skill.category]) {
                        acc[skill.category] = {
                            name: skill.category,
                            icon: iconMap[skill.icon] || <Code size={24} />,
                            skills: []
                        }
                    }
                    acc[skill.category].skills.push(skill.name)
                    return acc
                }, {})

                setSkillsData(Object.values(grouped))
            } catch (err) {
                console.error("Failed to fetch skills", err)
                setSkillsData([])
            } finally {
                setLoading(false)
            }
        }
        fetchSkills()
    }, [])

    if (loading) return null

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
                    {skillsData.map((category, index) => (
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
