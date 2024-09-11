import { Link } from 'react-router-dom';
import useFetchChannelDetails from '../../useHooks/useFetchChannelDetails'
import LoadingBar from '../loadingBar/LoadingBar';
import { formatNumbers } from '../../utils/formattedNumbers';
import './channelDetails.scss';

const ChannelDetails = ({ id, title }) => {
    const { loading, error, channelDetails } = useFetchChannelDetails(id);

    if (loading) return <LoadingBar />
    if (error) return <p classname="error">Error fetching data: {error.message}</p>;
    const subscriberCount = channelDetails.items[0].statistics.subscriberCount;
    const subscribers = formatNumbers(subscriberCount);
    return (
        <div className="channel-content">
            <img src={channelDetails.items[0].snippet.thumbnails.default.url} alt={title} width="40px" height="40px" />
            <div className="channel-title">
                <Link to={`/channel/${id}`} className="link" aria-label="Navigate to channel page">
                    <h4>{title}</h4>
                </Link>
                <p>{subscribers} subscribers</p>
            </div>
            <button>Subscribe</button>
        </div>
    )
}

export default ChannelDetails
