import React, { useContext, useEffect, useState } from 'react';
import { isExpired, decodeToken } from 'react-jwt';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import { userContext } from "../../../context/userContext";
import { loginContext } from '../../../context/loginContext';

import Pokemons from '../Pokemons/Pokemons';
import Spinner from '../../../utils/Spinner'
//import useAxios from "../../../hooks/useAxios";

import Login from "./Login/Login";

function Home () {

  const { users, setUsers } = useContext(userContext);
  const { loginUser, setLoginUser } = useContext(loginContext);
  const [ message, setMessage ] = useState(null);

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
        setMessage(null);
        setUsers("");
        const request = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20")
        const response = await request.data.results;
        console.log(request.data)
        setUsers(response)
      } catch (err) {
        console.log(err);
        setMessage(err.message);
      }
    }
    fetchData();
  },[loginUser])

  const paintUsers = () => {
    return users.map(
      (user) => (
      <Pokemons value={user} key={uuidv4()}/>))
  };

  return (
    <div className="home container">
      {!loginUser ? <Login/> : 
        !users ? <><Spinner/>{ message && <p>{message}</p>}</>  
        : paintUsers()}
    </div>
  )
}

export default Home;
