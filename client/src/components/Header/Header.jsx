import React from "react";

import logo from '../../logo.svg';
import Nav from './Nav/Nav';

import css from '../../assets/CSS3_logo.png'
import express from '../../assets/Expressjs_logo.png';

function Header () {

  return (
    <>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          MERN APP
        </p>
        <div className="logos">
          <img src={css} alt="css logo" className="logo"/>          
          <img src={express} alt="express logo" className="logo"/>
        </div>
        <img src={logo} className="App-logo reverse" alt="logo" />
      </header>
      <Nav/>
    </>
  )
}

export default Header;
