import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url) => {
    console.log(url)
    const [ loading, setLoading ] = useState(true);
    const [result, setResult] = useState([]);

    useEffect (() => {
        async function getData () {
            axios.get(url)
            .then((res)=> {
                console.log(res.data)
                setTimeout(() => {
                    setData(res.data)
                }, 2000);
                setResult(res.data);
                setLoading(false);
            })
            .catch((err) => {
            console.log(err);
            })
        }
        getData();
    },[url]);
    return {loading, result};
}

export default useFetch;
