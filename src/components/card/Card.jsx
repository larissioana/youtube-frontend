import React from 'react'
import './card.scss';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from 'react-router-dom';
import { truncateTitle } from '../../utils/text';

const Card = ({ item }) => {
    const imageUrl = item.snippet.thumbnails.high.url || item.snippet.thumbnails.medium;

    const getLinkPath = () => {
        if (item?.id?.videoId) {
            return `/video/${item.id.videoId}`;
        } else if (item?.id?.channelId) {
            return `/channel/${item.id.channelId}`;
        } else {
            return '#';
        }
    };

    return (
        <div className="card-container">
            {
                imageUrl &&
                <>
                    <Link to={getLinkPath()} aria-label="Navigate to video page">
                        <LazyLoadImage effect='blur' width="100%" height="100%" loading="lazy" className="card-image" src={imageUrl} alt="youtube thumbnails" />
                    </Link>
                    <h2>{truncateTitle(item.snippet.title, 500)}</h2>
                    {
                        item.snippet.channelTitle &&
                        <Link to={`/channel/${item.snippet.channelId}`} className="link" >
                            <p>{item.snippet.channelTitle}</p>
                        </Link>
                    }
                </>
            }
        </div>
    )
}

export default Card
