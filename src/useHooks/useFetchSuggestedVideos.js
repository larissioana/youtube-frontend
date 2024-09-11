import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchSuggestedVideos = (id) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [suggestedVideos, setSuggestedVideos] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            const localStorageKey = `youtube_suggested_videos${id}`;
            const storedData = localStorage.getItem(localStorageKey);

            if (storedData) {
                setSuggestedVideos(JSON.parse(storedData));
                setLoading(false);
            } else {
                const options = {
                    method: "GET",
                    url: "https://youtube-v31.p.rapidapi.com/search",
                    params: {
                        relatedToVideoId: id,
                        part: "id,snippet",
                        type: "video",
                        maxResults: "30"
                    },
                    headers: {
                        'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
                        'x-rapidapi-host': 'youtube-v31.p.rapidapi.com'
                    }
                };
                try {
                    const response = await axios.request(options);
                    localStorage.setItem(localStorageKey, JSON.stringify(response.data));
                    setSuggestedVideos(response.data);
                } catch (error) {
                    setError(error.message || "Failed to fetch data.")
                } finally {
                    setLoading(false);
                }
            }
        }
        fetchData();
    }, [id]);
    return { suggestedVideos, loading, error };
}

export default useFetchSuggestedVideos;