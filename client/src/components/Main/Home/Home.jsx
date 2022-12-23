import React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';

import User from '../User/User';

function Home () {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("/users")
      .then((res)=> {
        console.log(res.data)
        //setData(res.data[0].nombre);
        setData(res.data)
      })
      .catch((err) => {
        console.log(err);
      })
  },[]);

  const paintUsers = () => {
    return data.map(
      (user,i) => (
      <User value={user} key={i}/>))
  };

  return (
    <div className="home">
      {paintUsers()}
      {/* {!data ? <p>"Loading..."</p> : data.map((temp,i) => <p value={temp.nombre} key={i}/>)} */}
    </div>
  )
}

export default Home;
