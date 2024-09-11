import React from 'react'
import './sidebar.scss';

const Sidebar = () => {
    return (
        <div className="sidebar-component">
            <div className="sidebar-links">
                <span className="material-symbols-outlined">
                    home
                </span>
                <a href="/" className="link">Home</a>
                <span className="material-symbols-outlined">
                    youtube_activity
                </span>
                <a href="#" className="link">Activity</a>
                <span className="material-symbols-outlined">
                    subscriptions
                </span>
                <a href="#" className="link">Subscriptions</a>
            </div>
        </div>
    )
}

export default Sidebar
