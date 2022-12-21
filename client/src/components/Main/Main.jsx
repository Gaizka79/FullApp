import React from "react";
import { Routes, Route } from 'react-router-dom';

import Home from './Home/Home';
import User from './User/User';

function Main () {
  return (
    <main className="main">
      <Routes>
        <Route element={<Home/>} path='/'/>
        <Route element={<User/>} path='/users'/>
      </Routes>
    </main>
  )
}

export default Main;
