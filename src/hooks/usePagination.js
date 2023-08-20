import axios from "axios";
import { useEffect, useState } from "react";

export default function usePagination(page) {
    const [data, setData] = useState([]); // stores data retrieved
    const [more, setMore] = useState(true); // indicates if there's more data to be retrieved from the API.
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false); // indicates error existence

    useEffect(() => {
        // Reset error state before loading
        setError(false);

        // indicate that data-fetching is ongoing
        setLoading(true);

        // make call to API
        axios.get(`{process.env.REACT_APP_API_DOMAIN}:{process.env.REACT_APP_API_PORT}/api/posts/`, {
            params: { // query params
                page
            },
            withCredentials: true
        }).then(({ data: resData }) => {
            setData((prev) => [...new Set([...prev, ...resData])]);
            setMore(resData.length == 30); // set more to true if nextPage exists
            setLoading(false);
        })
            .catch(() => setError(true));
    }, [page]);

    return { data, more, loading, error };
}
