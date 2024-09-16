import React from 'react'
import './channel.scss';
import { useParams } from 'react-router-dom';
import useFetchChannelDetails from '../../../useHooks/useFetchChannelDetails';
import LoadingBar from '../../loadingBar/LoadingBar';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { formatNumbers } from '../../../utils/formattedNumbers';
import ChannelVideos from '../../channelVideos/ChannelVideos';
import { Helmet } from 'react-helmet-async';

const parseTextWithLinks = (text) => {
    const urlPattern = /((https?:\/\/[^\s]+))/g;

    const parts = text.split(urlPattern);

    return parts.map((part, index) => {
        if (urlPattern.test(part)) {
            return (
                <a key={index} href={part} style={{ color: "var(--links)", display: "inline-block", maxWidth: "400px" }} target="_blank" rel="noopener noreferrer" className="blur">
                    {part}
                </a>
            );
        }
        return <span key={index}>{part}</span>;
    });
};

const Channel = ({ isMenuOpen }) => {
    const { id } = useParams();
    const { loading, error, channelDetails } = useFetchChannelDetails(id);

    if (loading) return <LoadingBar />
    if (error) return <p classname="error">Error fetching data: {error.message}</p>;

    const imageUrl2 = channelDetails.items[0].snippet.thumbnails.medium.url || channelDetails.items[0].snippet.thumbnails.default.url;

    const title = channelDetails?.items[0]?.brandingSettings?.channel?.title;
    const description = channelDetails?.items[0]?.brandingSettings?.channel?.description;

    return (
        <div
            className="channel-page-container"
            style={{
                opacity: isMenuOpen ? ".5" : "1"
            }}>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <div className="channel-flex-container">
                <div className="more-details">
                    {imageUrl2 &&
                        <LazyLoadImage effect="blur" width="88px" height="88px" src={imageUrl2} alt={title} />
                    }
                    <div className="channel-info">
                        <h3>{title}</h3>
                        <div className="channel-flex">
                            <ul>
                                <li>{channelDetails?.items[0]?.snippet?.customUrl}</li>
                                <li>{formatNumbers(channelDetails?.items[0]?.statistics?.subscriberCount)} subscribers</li>
                                <li>{formatNumbers(channelDetails?.items[0]?.statistics?.videoCount)} videos</li>
                            </ul>

                        </div>
                        {
                            description &&
                            <p className="description">{parseTextWithLinks(description)}</p>
                        }
                    </div>
                </div>
                <div className="channel-title">
                    <h2>Videos</h2>
                </div>
                <ChannelVideos id={id} />
            </div>
        </div >
    )
}

export default Channel
