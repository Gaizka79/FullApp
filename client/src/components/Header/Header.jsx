import React, { useContext } from "react";

import { loginContext } from "../../context/loginContext";


import Nav from './Nav/Nav';

import poke_logo from '../../assets/poke_logo.png';



function Header () {

  const { loginUser } = useContext(loginContext);

  return (
    <>
      <header className="header">
        <div className="logos">
          <img src={poke_logo} alt="poke_logo" className="poke_logo"/>    
          {loginUser && <p className="bienvenido">Bienvenido: {loginUser}</p>}
        </div>
        
      </header>
      
      <Nav/>
    </>
  )
}

export default Header;
