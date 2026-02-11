import React, { useState, useEffect } from 'react'
import Login from './Login'
import Dashboard from './Dashboard'

const API_BASE = 'http://localhost:8000/api/v1'

const AdminPage = () => {
    const [token, setToken] = useState(localStorage.getItem('admin_token'))
    const [isValid, setIsValid] = useState(false)
    const [checking, setChecking] = useState(true)

    useEffect(() => {
        if (token) {
            // Verify token by making a test request
            fetch(`${API_BASE}/projects/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
                .then(res => {
                    if (res.ok) {
                        setIsValid(true)
                    } else {
                        localStorage.removeItem('admin_token')
                        setToken(null)
                        setIsValid(false)
                    }
                })
                .catch(() => {
                    // Backend might not be running, still allow if token exists
                    setIsValid(true)
                })
                .finally(() => setChecking(false))
        } else {
            setChecking(false)
        }
    }, [token])

    const handleLogin = (newToken) => {
        setToken(newToken)
        setIsValid(true)
    }

    const handleLogout = () => {
        localStorage.removeItem('admin_token')
        setToken(null)
        setIsValid(false)
    }

    if (checking) {
        return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-main)', color: 'var(--text-muted)' }}>Verifying...</div>
    }

    if (!token || !isValid) {
        return <Login onLogin={handleLogin} />
    }

    return <Dashboard token={token} onLogout={handleLogout} />
}

export default AdminPage
