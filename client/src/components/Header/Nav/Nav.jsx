import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { loginContext } from "../../../context/loginContext";

function Nav () {

  const { loginUser, setLoginUser } = useContext(loginContext);

  const handleLogout = () => {
    localStorage.setItem('token', "")
    setLoginUser(null)
  }

  return (
    <>
      {loginUser ?
        <nav>
          <Link to={"/"}><button className="button"><b>Home</b></button></Link>
          <button onClick={handleLogout} className="button"><b>Logout</b></button>
        </nav> :
        ""
      }
    </>
  )
}

export default Nav;
