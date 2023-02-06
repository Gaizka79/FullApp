import './styles/styles.scss';
import { BrowserRouter } from 'react-router-dom';
import { useState } from 'react';
import React from 'react';

import { userContext } from './context/userContext';
import { loginContext } from './context/loginContext';

import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

function App() {

  const [ users, setUsers ] = useState([]);
  const [ loginUser, setLoginUser ] = useState(null)
  const [ token, setToken ] = useState(null);

  const data = {
    users,
    setUsers
  };
  const user = {
    loginUser,
    setLoginUser,
    token,
    setToken
  }
  
  return (
    <div className="App">
      <BrowserRouter>
        <loginContext.Provider value={user}>
          <Header/>
        <userContext.Provider value={data}>
          <Main/>
        </userContext.Provider>
        </loginContext.Provider>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
