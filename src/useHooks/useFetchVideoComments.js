import { useState, useEffect } from 'react'
import axios from 'axios';

const useFetchVideoComments = (id) => {
    const [videoComments, setVideoComments] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVideoData = async () => {
            const storedData = localStorage.getItem(`comments-${id}`);

            if (storedData) {
                setVideoComments(JSON.parse(storedData));
                setLoading(false);
            } else {
                try {
                    const options = {
                        method: 'GET',
                        url: 'https://youtube-v31.p.rapidapi.com/commentThreads',
                        params: {
                            part: 'snippet, replies',
                            videoId: id,
                            maxResults: "20"
                        },
                        headers: {
                            'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
                            'x-rapidapi-host': 'youtube-v31.p.rapidapi.com',
                        },
                    };

                    const response = await axios.request(options);
                    const data = response.data;
                    localStorage.setItem(`comments-${id}`, JSON.stringify(data));
                    setVideoComments(data);
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

    return { loading, videoComments, error }
}

export default useFetchVideoComments;
