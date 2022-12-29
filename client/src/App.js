import './styles/styles.scss';
import { BrowserRouter } from 'react-router-dom';
import { useState } from 'react';
import React from 'react';

import { userContext } from './context/userContext';
import { loadingContext } from './context/loadingContext';

import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

function App() {

  const [ users, setUsers ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);

  const data = {
    users,
    setUsers
  };

  const loading = {
    isLoading,
    setIsLoading
  };
  
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <userContext.Provider value={data}>
        <loadingContext.Provider value={loading}>
          <Main/>
        </loadingContext.Provider>
        </userContext.Provider>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
