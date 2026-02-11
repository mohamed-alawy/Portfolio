const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000/api/v1'

// Extract the base domain from API_BASE (removes /api/v1)
export const IMAGE_BASE = API_BASE.replace('/api/v1', '')

export const getImageUrl = (url) => {
    if (!url) return ''
    if (url.startsWith('http')) return url
    // If it starts with /api/v1, prepend IMAGE_BASE
    // If it starts with /uploads, prepend IMAGE_BASE + /api/v1
    if (url.startsWith('/api')) return `${IMAGE_BASE}${url}`
    return `${API_BASE}${url.startsWith('/') ? '' : '/'}${url}`
}

export default API_BASE
