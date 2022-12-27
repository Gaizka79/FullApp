import './styles/styles.scss';
import { BrowserRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';
import React from 'react';

import { userContext } from './context/userContext';
import axios from 'axios';

import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

function App() {

  const [ users, setUsers ] = useState([]);

  useEffect (() => {
    console.log("En el useffect")
    const getUsers = async () => {
      try {
        const resp = await axios.get("/users")
        const result = await resp.data;
        console.log(result)
        setUsers(result)
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    }
    getUsers()
    
  },[]);

  const addUser = (user) => {
    setUsers([user, ...users])
  }

  const data = {
    users,
    setUsers,
    addUser
  }
  
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <userContext.Provider value={data}>
          <Main/>
        </userContext.Provider>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
