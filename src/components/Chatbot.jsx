import React, { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, User } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import '../styles/Chatbot.css'
import chatBotImage from '../assets/images/chatBot.png'

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi! I'm Mohamed's AI Assistant. Ask me about his projects, skills, or experience!", sender: 'bot' }
    ])
    const [inputValue, setInputValue] = useState('')
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages, isOpen])

    const handleSend = () => {
        if (!inputValue.trim()) return

        const userMsg = { id: messages.length + 1, text: inputValue, sender: 'user' }
        setMessages(prev => [...prev, userMsg])
        setInputValue('')

        // TODO: Connect to RAG Backend here
        // For now, simulate a response
        setTimeout(() => {
            const botMsg = {
                id: messages.length + 2,
                text: "I'm currently in demo mode. Mohamed will connect me to his RAG backend soon!",
                sender: 'bot'
            }
            setMessages(prev => [...prev, botMsg])
        }, 1000)
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSend()
    }

    // Idle timer logic
    const [isIdle, setIsIdle] = useState(false)
    const idleTimerRef = useRef(null)

    const startIdleTimer = () => {
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
        idleTimerRef.current = setTimeout(() => {
            setIsIdle(true)
        }, 10000) // 10 seconds
    }

    const handleMouseEnter = () => {
        setIsIdle(false)
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
    }

    const handleMouseLeave = () => {
        startIdleTimer()
    }

    useEffect(() => {
        startIdleTimer()
        return () => {
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
        }
    }, [])

    // Typing effect logic
    const [greetingText, setGreetingText] = useState('')
    const fullGreeting = "Welcome to my world. Ask me about my skills and projects"

    useEffect(() => {
        if (isOpen || isIdle) {
            setGreetingText('')
            return
        }

        let i = 0
        const typingInterval = setInterval(() => {
            if (i < fullGreeting.length) {
                setGreetingText(fullGreeting.slice(0, i + 1))
                i++
            } else {
                clearInterval(typingInterval)
            }
        }, 50) // Adjust speed here

        return () => clearInterval(typingInterval)
    }, [isOpen, isIdle])

    return (
        <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="chatbot-window"
                    >
                        <div className="chatbot-header">
                            <div className="header-info">
                                <Bot size={20} />
                                <span>AI Assistant</span>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="close-btn">
                                <X size={18} />
                            </button>
                        </div>

                        <div className="chatbot-messages">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`message ${msg.sender}`}>
                                    <div className="message-bubble">
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="chatbot-input">
                            <input
                                type="text"
                                placeholder="Ask something..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                            <button onClick={handleSend} disabled={!inputValue.trim()}>
                                <Send size={18} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Avatar Trigger & Greeting Bubble */}
            <div
                className="chatbot-trigger-wrapper"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <AnimatePresence>
                    {!isOpen && !isIdle && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="chatbot-greeting"
                        >
                            <div className="greeting-bubble">
                                {greetingText}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className="chatbot-avatar-btn"
                    animate={{
                        opacity: isIdle && !isOpen ? 0.5 : 1,
                        x: isIdle && !isOpen ? 15 : 0 // Slide right when idle
                    }}
                    transition={{ duration: 0.5 }}
                >
                    {isOpen ? (
                        <div className="close-icon-wrapper">
                            <X size={24} />
                        </div>
                    ) : (
                        <img src={chatBotImage} alt="Chat with me" className="chatbot-avatar" />
                    )}
                </motion.button>
            </div>
        </div>
    )
}

export default Chatbot
