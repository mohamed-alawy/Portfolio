import React, { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import API_BASE from '../config'
import '../styles/Chatbot.css'

const chatBotImage = '/images/chatBot.png'

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi! I'm Mohamed's AI Assistant. Ask me about his projects, skills, or experience!", sender: 'bot' }
    ])
    const [inputValue, setInputValue] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages, isOpen, isTyping])

    // Simulated streaming effect (Typewriter)
    const streamMessage = (fullText, messageId) => {
        let currentText = ""
        let index = 0
        const words = fullText.split(' ')

        const interval = setInterval(() => {
            if (index < words.length) {
                currentText += (index === 0 ? "" : " ") + words[index]
                setMessages(prev => prev.map(m =>
                    m.id === messageId ? { ...m, text: currentText } : m
                ))
                index++
            } else {
                clearInterval(interval)
            }
        }, 40) // Adjust speed (ms per word)
    }

    const handleSend = async () => {
        if (!inputValue.trim()) return

        const userMsg = { id: Date.now(), text: inputValue, sender: 'user' }
        setMessages(prev => [...prev, userMsg])
        const query = inputValue
        setInputValue('')

        setIsTyping(true)

        const history = messages.slice(-10).map(m => ({
            role: m.sender === 'user' ? 'user' : 'bot',
            content: m.text
        })).filter(m => m.content.trim() !== "")

        try {
            const res = await fetch(`${API_BASE}/chat/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: query, history })
            })

            const data = await res.json()
            const botResponse = data.response || data.detail || 'Sorry, I could not process that.'

            setIsTyping(false)

            // Add initial empty bot message
            const botMsgId = Date.now() + 1
            setMessages(prev => [...prev, { id: botMsgId, text: '', sender: 'bot' }])

            // Start typewriter effect
            streamMessage(botResponse, botMsgId)

        } catch (err) {
            setIsTyping(false)
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: 'Connection error. Please make sure the backend is running.',
                sender: 'bot'
            }])
        }
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
                                <div className="bot-status-wrap">
                                    <Sparkles size={18} className="sparkle-icon" />
                                    <span className="status-dot"></span>
                                </div>
                                <div className="header-text">
                                    <span className="bot-name">Mohamed AI</span>
                                    <span className="bot-statusText">Online</span>
                                </div>
                            </div>
                        </div>

                        <div className="chatbot-messages">
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    className={`message ${msg.sender}`}
                                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="message-bubble">
                                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                                    </div>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <motion.div
                                    className="message bot"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <div className="message-bubble">
                                        <div className="typing-indicator">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="chatbot-input">
                            <input
                                type="text"
                                placeholder="Ask something..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                disabled={isTyping}
                            />
                            <button onClick={handleSend} disabled={!inputValue.trim() || isTyping}>
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
