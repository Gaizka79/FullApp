import React from "react";
import { useContext } from 'react';

import { userContext } from "../../../context/userContext";

import User from '../User/User';
import Spinner from '../../../utils/Spinner';
//import getUsers from "../../../hooks/getUsers";

function Home () {

  const { users } = useContext(userContext);
  
  console.log(users)

  const paintUsers = () => {
    return users.map(
      (user,i) => (
      <User value={user} key={i}/>))
  };

  return (
    <div className="home">
      <section className="container">
        {!users ? <Spinner/>: ""}
        {!users ? <p>"Loading..."</p> : paintUsers()}
      </section>
      
    </div>
  )
}

export default Home;
