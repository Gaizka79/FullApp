import React from "react";
import { useContext, useEffect } from 'react';

import { userContext } from "../../../context/userContext";

import User from '../User/User';
import Spinner from '../../../utils/Spinner'
import useAxios from "../../../hooks/useAxios";

function Home () {

  const { users, setUsers } = useContext(userContext);
  const { response, loading, error } = useAxios();

  useEffect (() => {
    if (error) console.log(`Error: ${error}`);
    if (response !== null) {
      setUsers(response)
    }
    console.log(response)
  },[response]);

  const paintUsers = () => {
    return users.map(
      (user,i) => (
      <User value={user} key={i}/>))
  };

  return (
    <div className="home">
      <section className="container">
        {loading ? <Spinner/>: ""}
        {loading ? <p>"Loading..."</p> : paintUsers()}
      </section>
      
    </div>
  )
}

export default Home;
