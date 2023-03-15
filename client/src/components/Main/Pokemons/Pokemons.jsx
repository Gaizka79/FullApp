import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Card from './Card/Card';

import { userContext } from "../../../context/userContext";
import axios from "axios";
import star from '../../../assets/star.png';
//import { response } from "express";

function Pokemons (props) {

  const { setUsers, userData } = useContext(userContext);
  const { nombre, apellidos, email, role, _id } = props.value;
  const { name, url } = props.value;
  const [ image, setImage ] = useState(null);
  const [ pokemon, setPokemon ] = useState(null);
  const [ id, setId ] = useState(null)

  console.log(props)

  useEffect(() => {
    //console.log(props)
    const getImage = async url => {
      await axios.get(url)
        .then((request) => request.data.sprites.front_default)
        .then((request)=> setImage(request))
        .catch((error) => console.error(error))
    }
    getImage(url);
    setId(parseInt(url.slice(-3, -1)))
  },[url])

  const handleDelete = async (event) => {
    event.preventDefault();
    console.log(event);
    console.log(_id);
    try {
      axios.delete(`/users/delete/${_id}`)
        .then((response) => console.log(response.data))
      
      const resp = await axios.get("/users")
      setUsers(resp.data)
      
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }

  const handleCarrito = () => {}

  const handleFavoritos = () => {
    console.log(id)
    console.log(typeof(id))
    console.log(userData)
    let values = { ...userData, id }
    axios.put(`favorites`, values)
        .then((response) => console.log(response))
  }
  
  
  return (
    <article className="pokemon">
      {userData.favorites.includes(id) && <img src={star} alt="favorito" className="star" />}
      <img src={image} alt={name} />
      <h2>{name}</h2>
      
      <div className="botones">
        <button onClick={handleCarrito} className="button"><b>Añadir al carrito</b></button>
        <Link to={`/${name}`}><button className="button"><b>Detalles</b></button></Link>
        <button onClick={handleFavoritos} className="button"><b>Favoritos</b></button>
      </div>
      <div>
        {userData.favorites}
      </div>
    </article>
  )
}

export default Pokemons;
