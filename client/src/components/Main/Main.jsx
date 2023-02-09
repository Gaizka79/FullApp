import React from "react";
import { Routes, Route } from 'react-router-dom';

import Home from './Home/Home';
import Pokemons from './Pokemons/Pokemons';
import Card from "./Pokemons/Card/Card";
import New from "./Pokemons/New/New";
import Edit from "./Pokemons/Edit/Edit";

function Main () {
  return (
    <main className="main">
      <Routes>
        <Route element={<Home/>} exact path='/'/>
        <Route element={<Pokemons/>} path='/pokemons'/>
        <Route element={<Card/>} path='/:nombre'/>
        <Route element={<New/>} path='/new'/>
        <Route element={<Edit/>} path='/edit/:_id'/>
      </Routes>
    </main>
  )
}

export default Main;
