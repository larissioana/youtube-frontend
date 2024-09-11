import { useState, useEffect } from 'react'
import axios from 'axios';

const useFetchChannelDetails = (id) => {
    const [channelDetails, setChannelDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVideoData = async () => {
            const storedData = localStorage.getItem(`channel-${id}`);

            if (storedData) {
                setChannelDetails(JSON.parse(storedData));
                setLoading(false);
            } else {
                try {
                    const options = {
                        method: 'GET',
                        url: 'https://youtube-v31.p.rapidapi.com/channels',
                        params: {
                            part: 'snippet,statistics',
                            id: id,
                        },
                        headers: {
                            'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
                            'x-rapidapi-host': 'youtube-v31.p.rapidapi.com',
                        },
                    };

                    const response = await axios.request(options);
                    const data = response.data;

                    localStorage.setItem(`channel-${id}`, JSON.stringify(data));
                    setChannelDetails(data);
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

    return { loading, channelDetails, error }
}

export default useFetchChannelDetails
