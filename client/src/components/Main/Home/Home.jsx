import React, { useContext, useEffect } from 'react';
import { isExpired, decodeToken } from 'react-jwt';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import { userContext } from "../../../context/userContext";
import { loginContext } from '../../../context/loginContext';

import User from '../User/User';
//import Spinner from '../../../utils/Spinner'
//import useAxios from "../../../hooks/useAxios";

import Login from "./Login/Login";

function Home () {

  const { users, setUsers } = useContext(userContext);
  const { loginUser, setLoginUser } = useContext(loginContext);

  useEffect (() => {
    async function checkToken () {
      let isLogged = localStorage.getItem('token')
      if (isExpired(isLogged)) return
      if (isLogged) {
        let temp = decodeToken(isLogged)
        setLoginUser(temp.nombre)
      }
    }
    checkToken();
  },[])


  useEffect (() => {
    async function fetchData() {
      try {
          const request = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20")
          const response = await request.data.results;
          console.log(request)
          setUsers(response)
      } catch (err) {
          console.log(err);
      }
    }
    fetchData();
  },[loginUser])

  const paintUsers = () => {
    
    return users.map(
      (user) => (
      <User value={user} key={uuidv4()}/>))
  };

  return (
    <div className="home container">
      {!loginUser ? <Login/> : paintUsers()}
      {/* {!loginUser ? <Login/> :  getPokemons()} */}
      {/* {loading ? <Spinner/>: ""}
      {loading ? <p>"Loading..."</p> : paintUsers()}  */} {/* //quitamos isLoading */}
    </div>
  )
}

export default Home;
