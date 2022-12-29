import { useState, useEffect } from "react";
import axios from "axios";

const useAxios = (url = "/users") => {

    const [ response, setResponse ] = useState(null);
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    const fetchData = async() => {
        setTimeout(async() => {
            await axios.get(url)
                .then((res) => setResponse(res.data))
                .catch((err) => setError(err))
                .finally(() => setLoading(false))
        }, 2000);
    }

    useEffect(() => {
        fetchData();
    }, [url]);
    return { response, error, loading };
};

export default useAxios;