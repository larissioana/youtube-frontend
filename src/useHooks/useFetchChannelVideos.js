import { useState, useEffect } from 'react'
import axios from 'axios';

const useFetchChannelVideos = (id) => {
    const [channelVideos, setChannelVideos] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVideoData = async () => {
            const storedData = localStorage.getItem(`channel-videos-${id}`);

            if (storedData) {
                setChannelVideos(JSON.parse(storedData));
                setLoading(false);
            } else {
                try {
                    const options = {
                        method: 'GET',
                        url: 'https://youtube-v31.p.rapidapi.com/search',
                        params: {
                            channelId: id,
                            part: 'snippet,id',
                            maxResults: "30",
                            order: "date"
                        },
                        headers: {
                            'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
                            'x-rapidapi-host': 'youtube-v31.p.rapidapi.com',
                        },
                    };

                    const response = await axios.request(options);
                    const data = response.data;

                    localStorage.setItem(`channel-videos-${id}`, JSON.stringify(data));
                    setChannelVideos(data);
                    setLoading(false);
                } catch (error) {
                    console.error(error);
                    setError('Failed to fetch video data.');
                    setLoading(false);
                }
            }
        };

        fetchVideoData();
    }, [id]);

    return { loading, channelVideos, error }
}

export default useFetchChannelVideos;
