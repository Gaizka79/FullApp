import React from "react";

import logo from '../../logo.svg';
import mongo from '../../assets/mongodb_logo.png';
import express from '../../assets/Expressjs_logo.png';
import react_logo from '../../assets/react_logo.png';
import node_logo from '../../assets/Nodejs_logo.png';

function Footer () {
  return (
    <footer>
      <div className="logos">
        <img src={logo} className="App-logo" alt="logos" />
        <div>
        <img src={mongo} alt="mongo logo" className="logo"/>
        <img src={express} alt="express logo" className="logo"/>
        <img src={react_logo} alt="react_logo logo" className="logo"/>   
        <img src={node_logo} alt="node_logo logo" className="logo"/>    
        </div>
        <img src={logo} className="App-logo reverse" alt="logo" />
      </div>
        
      <strong>Developed by <a 
        href="https://github.com/Gaizka79/FullApp.git" 
        target="_blank" 
        rel="noreferrer" 
        className="link">Gaizka</a>
      </strong>
    </footer>
  )
}

export default Footer;
