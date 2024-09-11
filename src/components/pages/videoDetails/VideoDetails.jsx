import useFetchVideoData from '../../../useHooks/useFetchVideoData';
import './videoDetails.scss';
import { useParams } from 'react-router-dom';
import LoadingBar from '../../loadingBar/LoadingBar';
import Player from '../../player/Player';
import ChannelDetails from '../../channelDetails/ChannelDetails';
import { formatNumbers } from '../../../utils/formattedNumbers';
import { timeAgo } from '../../../utils/time';
import { useState, lazy, Suspense } from 'react';
const Share = lazy(() => import('../../share/Share'));
const Description = lazy(() => import('../../description/Description'));
const Comments = lazy(() => import('../../comments/Comments'));
import { formatText } from '../../../utils/text';
import SuggestedVideos from '../../suggestedVideos/SuggestedVideos';
import { Helmet } from 'react-helmet-async'

const VideoDetails = ({ isMenuOpen }) => {
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const { id } = useParams();
    if (id === undefined) {
        return <p>No video details available.</p>;
    }
    const { loading, error, videoData } = useFetchVideoData(id);

    if (loading) return <LoadingBar />
    if (error) return <p classname="error">Error fetching data: {error.message}</p>;

    const likes = videoData?.items[0]?.statistics?.likeCount;
    const formattedLikesCount = formatNumbers(likes);
    const views = videoData?.items[0]?.statistics?.viewCount;
    const formattedViewsCount = Number(views).toLocaleString();
    const description = videoData?.items[0]?.snippet?.description;
    const sentences = formatText(description);

    const handleShareModal = () => {
        setIsShareModalOpen(true);
    };

    const channelId = videoData?.items[0]?.snippet?.channelId;

    return (
        <>
            <Helmet>
                <title>{videoData?.items[0].snippet?.title}</title>
            </Helmet>
            <div className="video-details-container" style={{
                opacity: isMenuOpen ? ".5" : "1",
            }}>
                <div className="video-container">
                    <div className="video-left">
                        <div className="video-wrapper">
                            <Player videoId={videoData.items[0].id} />
                        </div>
                        <h2>{videoData.items[0].snippet.title}</h2>
                        <div className="flex-container">
                            <div className="channel-wrapper">
                                <ChannelDetails id={channelId} title={videoData.items[0].snippet.channelTitle} />
                            </div>
                            <div className="share-and-likes">
                                <button className="likes-dislikes">
                                    <span className="material-symbols-outlined">
                                        thumb_up
                                    </span>
                                    <p>{formattedLikesCount}</p>
                                </button>
                                <div className="share-container" onClick={handleShareModal}>
                                    <span className="material-symbols-outlined">
                                        share
                                    </span>
                                    Share
                                </div>
                            </div>
                            {
                                isShareModalOpen &&
                                <Suspense>
                                    <Share setIsShareModalOpen={setIsShareModalOpen} />
                                </Suspense>
                            }
                        </div>
                        <div className="video-description">
                            <div className="views-and-date">
                                <p>{formattedViewsCount} views</p>
                                <p>{timeAgo(videoData.items[0].snippet.publishedAt)}</p>
                            </div>
                            <div className="description">
                                <Suspense>
                                    <Description sentences={sentences} />
                                </Suspense>
                            </div>
                        </div>
                        <div className="comments-container">
                            <Suspense fallback={<LoadingBar />}>
                                <Comments id={id} />
                            </Suspense>
                        </div>
                    </div>
                    <div className="video-right">
                        <SuggestedVideos id={id} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default VideoDetails
