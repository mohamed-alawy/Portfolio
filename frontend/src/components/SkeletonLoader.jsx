import React from 'react'
import '../styles/Skeleton.css'

export const SkeletonHero = () => (
    <div className="skeleton-container">
        <div className="skeleton-hero">
            <div className="skeleton-content">
                <div className="skeleton-item title"></div>
                <div className="skeleton-item subtitle"></div>
                <div className="skeleton-item text"></div>
                <div className="skeleton-item text short"></div>
                <div className="skeleton-actions">
                    <div className="skeleton-item button"></div>
                    <div className="skeleton-item button"></div>
                </div>
            </div>
            <div className="skeleton-image-wrapper">
                <div className="skeleton-circle"></div>
            </div>
        </div>
    </div>
)

export const SkeletonCard = () => (
    <div className="skeleton-card">
        <div className="skeleton-item card-icon"></div>
        <div className="skeleton-item card-title"></div>
        <div className="skeleton-item card-text"></div>
        <div className="skeleton-item card-text short"></div>
        <div className="skeleton-tags">
            <div className="skeleton-item tag"></div>
            <div className="skeleton-item tag"></div>
            <div className="skeleton-item tag"></div>
        </div>
    </div>
)

const SkeletonLoader = () => {
    return (
        <div className="skeleton-page-loader">
            <SkeletonHero />
            <div className="container">
                <div className="skeleton-grid">
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                </div>
            </div>
        </div>
    )
}

export default SkeletonLoader
