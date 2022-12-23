import './styles/styles.scss';
import { BrowserRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';

import React from 'react';

import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

import logo from './logo.svg';

import axios from 'axios';

function App() {
  /* const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("/users")
      .then((res)=> {
        console.log(res.data)
        setData(res.data[0].nombre);
      })
      .catch((err) => {
        console.log(err);
      })
  },[data]); */

  return (
    <div className="App">
      
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            {!data ? "Loading..." : data}
          </p>
        
        </header> */}
      <Header/>
      <BrowserRouter>
        <Main/>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
