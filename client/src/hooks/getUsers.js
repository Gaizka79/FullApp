import axios from 'axios';
import { useState } from 'react';

const getUsers = async () => {
    console.log("En getusers")

    //const [ loading, setLoading ] = useState(true);
    const [result, setResult] = useState([]);
    //let result = [];
    //let loading = true;
    try {
        let res = await axios.get("/users")
        //result = res.data;
        setResult(res.data)
        console.log(result);
    } catch (error) {
        console.log(error);
    }
    /* axios.get("/users")
    .then((res)=> {
        console.log(res.data)
        setTimeout(() => {
            setData(res.data)
        }, 2000);
        setResult(res.data);
        setLoading(false);
        result = res.data;
    })
    .catch((err) => {
        console.log(err);
    }); */
    return { result }
}

export default getUsers;