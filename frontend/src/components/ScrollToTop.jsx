import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
    const { pathname, state } = useLocation()

    useEffect(() => {
        if (state && state.scrollTo) {
            // If we have a target section from navigation state, scroll to it
            setTimeout(() => {
                const element = document.getElementById(state.scrollTo)
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                }
            }, 100) // Small delay to ensure rendering
        } else {
            // Otherwise, scroll to top on route change
            window.scrollTo(0, 0)
        }
    }, [pathname, state])

    return null
}

export default ScrollToTop
