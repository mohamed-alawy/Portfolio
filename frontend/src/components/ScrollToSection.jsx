import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToSection = () => {
    const { pathname, state } = useLocation()

    useEffect(() => {
        if (pathname === '/' && state?.scrollTo) {
            const targetId = state.scrollTo
            // Small delay to ensure the component is mounted and rendered
            setTimeout(() => {
                const element = document.getElementById(targetId)
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                    // Clear state to prevent scrolling again on subsequent renders
                    window.history.replaceState({}, document.title)
                }
            }, 100)
        }
    }, [pathname, state])

    return null
}

export default ScrollToSection
