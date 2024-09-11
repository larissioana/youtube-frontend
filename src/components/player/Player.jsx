import './player.scss'
import ReactPlayer from 'react-player'

const Player = ({ videoId }) => {
    return (
        <div className="player-container">
            <ReactPlayer
                controls
                autoPlay
                width="100%"
                height="500px"
                className="react-player"
                url={`https://www.youtube.com/watch?v=${videoId}`}
            />
        </div>
    )
}

export default Player
