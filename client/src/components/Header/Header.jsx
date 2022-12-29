import React from "react";

import logo from '../../logo.svg';
import Nav from './Nav/Nav';

function Header () {

  return (
    <>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          MERN APP
        </p>
        <img src={logo} className="App-logo reverse" alt="logo" />
      </header>
      <Nav/>
    </>
  )
}

export default Header;
