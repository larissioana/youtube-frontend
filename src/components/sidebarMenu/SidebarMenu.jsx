import React from 'react'
import './sidebarMenu.scss';

const SidebarMenu = () => {
    return (
        <div className="sidebarmenu-container">
            <div className="col1">
                <div className="sidebarmenu-links">
                    <span className="material-symbols-outlined">
                        home
                    </span>
                    <a href="/" className="link">Home</a>
                </div>
                <div className="sidebarmenu-links">
                    <span className="material-symbols-outlined">
                        youtube_activity
                    </span>
                    <a href="#" className="link">Activity</a>
                </div>
                <div className="sidebarmenu-links">
                    <span className="material-symbols-outlined">
                        subscriptions
                    </span>
                    <a href="#" className="link">Subscriptions</a>
                </div>
            </div>
            <div className="col2">
                <div className="sidebarmenu-links">
                    <span className="material-symbols-outlined">
                        account_box
                    </span>
                    <a href="#" className="link">Your channel</a>
                </div>
                <div className="sidebarmenu-links">
                    <span className="material-symbols-outlined">
                        history
                    </span>
                    <a href="#" className="link">History</a>
                </div>
                <div className="sidebarmenu-links">
                    <span class="material-symbols-outlined">
                        <span className="material-symbols-outlined">
                            queue_music
                        </span>
                    </span>
                    <a href="#" className="link">Playlists</a>
                </div>
                <div className="sidebarmenu-links">
                    <span className="material-symbols-outlined">
                        schedule
                    </span>
                    <a href="#" className="link">Watch later</a>
                </div>
                <div className="sidebarmenu-links">
                    <span className="material-symbols-outlined">
                        thumb_up
                    </span>
                    <a href="#" className="link">Liked videos</a>
                </div>
            </div>
            <div className="col3">
                <h3>Explore</h3>
                <div className="sidebarmenu-links">
                    <span className="material-symbols-outlined">
                        music_note
                    </span>
                    <a href="#" className="link">Music</a>
                </div>
                <div className="sidebarmenu-links">
                    <span className="material-symbols-outlined">
                        stadia_controller
                    </span>
                    <a href="#" className="link">Gaming</a>
                </div>
                <div className="sidebarmenu-links">
                    <span className="material-symbols-outlined">
                        <span class="material-symbols-outlined">
                            podcasts
                        </span>
                    </span>
                    <a href="#" className="link">Podcasts</a>
                </div>
                <div className="sidebarmenu-links">
                    <span className="material-symbols-outlined">
                        health_and_beauty
                    </span>
                    <a href="#" className="link">Health & Beauty</a>
                </div>
                <div className="sidebarmenu-links">
                    <span className="material-symbols-outlined">
                        psychology
                    </span>
                    <a href="#" className="link">Science</a>
                </div>
            </div>
        </div>
    )
}

export default SidebarMenu
