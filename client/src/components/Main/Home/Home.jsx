import React from "react";
import { useContext, useEffect } from 'react';

import { userContext } from "../../../context/userContext";
import { loadingContext } from "../../../context/loadingContext";

import User from '../User/User';
import Spinner from '../../../utils/Spinner'
import useAxios from "../../../hooks/useAxios";

function Home () {

  const { users, setUsers } = useContext(userContext);
  const { isLoading, setIsLoading } = useContext(loadingContext);
  const { response, loading, error } = useAxios();

  useEffect (() => {
    
    if (error) console.log(`Error: ${error}`);
    if (response !== null) {
      setUsers(response)
      setIsLoading(loading);
    }
    console.log(response)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[response]);

  const paintUsers = () => {
    return users.map(
      (user,i) => (
      <User value={user} key={i}/>))
  };

  return (
    <div className="home">
      <section className="container">
        {isLoading ? <Spinner/>: ""}
        {isLoading ? <p>"Loading..."</p> : paintUsers()}
      </section>
    </div>
  )
}

export default Home;
