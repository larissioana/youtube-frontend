import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchHome = (query) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            const localStorageKey = `youtube_search_${query}`;
            const storedData = localStorage.getItem(localStorageKey);

            if (storedData) {
                setData(JSON.parse(storedData));
                setLoading(false);
            } else {
                const options = {
                    method: "GET",
                    url: "https://youtube-v31.p.rapidapi.com/search",
                    params: {
                        q: query,
                        part: "snippet,id",
                        regionCode: "US",
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
                    setData(response.data);
                } catch (error) {
                    setError(error.message || "Failed to fetch data.")
                } finally {
                    setLoading(false);
                }
            }
        }
        fetchData();
    }, [query]);
    return { data, loading, error };
}

export default useFetchHome;