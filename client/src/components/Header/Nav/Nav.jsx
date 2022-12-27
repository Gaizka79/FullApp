import React from "react";
import { Link } from "react-router-dom";

function Nav () {

  return (
    <nav>
      
      <Link to={"/new"}>Nuevito</Link>
      <Link to={"/"}>Home</Link>

      <button className="button"><Link to={"/new"}>Berria</Link></button>
    </nav>
  )
}

export default Nav;
