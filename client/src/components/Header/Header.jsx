import React, { useContext } from "react";

import { loginContext } from "../../context/loginContext";

import logo from '../../logo.svg';
import Nav from './Nav/Nav';

import mongo from '../../assets/mongodb_logo.png';
import express from '../../assets/Expressjs_logo.png';
import react_logo from '../../assets/react_logo.png';
import node_logo from '../../assets/Nodejs_logo.png';



function Header () {

  const { loginUser, setLoginUser } = useContext(loginContext);

  return (
    <>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="logos">
          <img src={mongo} alt="mongo logo" className="logo"/>
          <img src={express} alt="express logo" className="logo"/>
          <img src={react_logo} alt="react_logo logo" className="logo"/>   
          <img src={node_logo} alt="node_logo logo" className="logo"/>    
        </div>
        <img src={logo} className="App-logo reverse" alt="logo" />
      </header>
      {loginUser && <p>Bienvenido: {loginUser}</p>}
      <Nav/>
    </>
  )
}

export default Header;
