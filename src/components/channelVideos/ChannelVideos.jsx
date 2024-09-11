import useFetchChannelVideos from '../../useHooks/useFetchChannelVideos';
import './channelVideos.scss';
import Card from '../card/Card';
import LoadingBar from '../loadingBar/LoadingBar';

const ChannelVideos = ({ id }) => {
    const { loading, error, channelVideos } = useFetchChannelVideos(id);
    if (loading) return <LoadingBar />
    if (error) return <p classname="error">Error fetching data: {error.message}</p>;

    return (
        <div className="channel-videos-wrapper">
            {
                channelVideos?.items.map((item, index) => {
                    return <Card item={item} key={index} />
                })
            }
        </div>
    )
}

export default ChannelVideos
