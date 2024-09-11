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
            console.log({ part })
            return (
                <a key={index} href={part} style={{ color: "var(--links)" }} target="_blank" rel="noopener noreferrer" className="blur">
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

    const imageUrl = channelDetails?.items[0]?.brandingSettings?.image?.bannerExternalUrl;
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
                <div className="banner">
                    {
                        imageUrl &&
                        <LazyLoadImage effect="blur" src={imageUrl} className="banner-image" alt="banner" width="100%" height="100%" />
                    }
                </div>
                <div className="more-details">
                    <LazyLoadImage effetc="blur" width="88px" height="88px" src={channelDetails.items[0].snippet.thumbnails.default.url} alt={title} />
                    <div className="channel-info">
                        <h3>{title}</h3>
                        <div className="channel-flex">
                            <ul>
                                <li>{channelDetails?.items[0]?.snippet?.customUrl}</li>
                                <li>{formatNumbers(channelDetails?.items[0]?.statistics?.subscriberCount)} subscribers</li>
                                <li>{formatNumbers(channelDetails?.items[0]?.statistics?.videoCount)} videos</li>
                            </ul>

                        </div>
                        <p>{parseTextWithLinks(description)}</p>
                    </div>
                </div>
                <div className="channel-title">
                    <h2>Related Videos</h2>
                </div>
                <ChannelVideos id={id} />
            </div>
        </div >
    )
}

export default Channel
