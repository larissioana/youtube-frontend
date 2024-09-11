import { useState, useEffect } from 'react'
import axios from 'axios';

const useFetchVideoData = (id) => {
    const [videoData, setVideoData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVideoData = async () => {
            const storedData = localStorage.getItem(`videoData-${id}`);

            if (storedData) {
                setVideoData(JSON.parse(storedData));
                setLoading(false);
            } else {
                try {
                    const options = {
                        method: 'GET',
                        url: 'https://youtube-v31.p.rapidapi.com/videos',
                        params: {
                            part: 'contentDetails,snippet,statistics',
                            id: id,
                        },
                        headers: {
                            'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
                            'x-rapidapi-host': 'youtube-v31.p.rapidapi.com',
                        },
                    };

                    const response = await axios.request(options);
                    const data = response.data;

                    localStorage.setItem(`videoData-${id}`, JSON.stringify(data));
                    setVideoData(data);
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

    return { loading, videoData, error }
}

export default useFetchVideoData
