import React from 'react'
import '../styles/Preloader.css'

const Preloader = () => {
    return (
        <div className="preloader">
            <div className="loader-content">
                <div className="spinner">
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                </div>
                <p className="loading-text">Loading...</p>
            </div>
        </div>
    )
}

export default Preloader
