import './suggestedVideos.scss';
import useFetchSuggestedVideos from '../../useHooks/useFetchSuggestedVideos';
import LoadingBar from '../loadingBar/LoadingBar';
import { truncateTitle } from '../../utils/text';
import { timeAgo } from '../../utils/time';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const SuggestedVideos = ({ id }) => {
    const { loading, error, suggestedVideos } = useFetchSuggestedVideos(id);
    if (loading) return <LoadingBar />
    if (error) return <p classname="error">Error fetching data: {error.message}</p>;

    return (
        <div className="suggested-videos-container">
            <h3>Recommendations</h3>
            {
                suggestedVideos?.items.map((item, index) => {
                    const thumbnailUrl = item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url;
                    return <Link to={`/video/${item.id.videoId}`} aria-label="Navigate to video page" className="link" key={index}>
                        <div className="suggested-videos">
                            <LazyLoadImage effect="blur" src={thumbnailUrl} alt={item.snippet.channelTitle} />
                            <div className="suggested-videos-details-wrapper">
                                <h3>{truncateTitle(item.snippet.title, 78)}</h3>
                                <h4>{item.snippet.channelTitle.slice(0, 30) + "..."}</h4>
                                <p>{timeAgo(item.snippet.publishedAt)}</p>
                            </div>
                        </div>
                    </Link>
                })
            }
        </div>
    )
}

export default SuggestedVideos
