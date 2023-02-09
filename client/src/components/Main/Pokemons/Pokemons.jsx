import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Card from './Card/Card';

import { userContext } from "../../../context/userContext";
import axios from "axios";
//import { response } from "express";

function Pokemons (props) {

  const { setUsers } = useContext(userContext);
  const { nombre, apellidos, email, role, _id } = props.value;
  const { name, url } = props.value;
  const [ image, setImage ] = useState(null);
  const [ pokemon, setPokemon ] = useState(null);


  useEffect(() => {
    //console.log(props)
    const getImage = async url => {
      await axios.get(url)
        .then((request) => request.data.sprites.front_default)
        .then((request)=> setImage(request))
        .catch((error) => console.error(error))
    }
    getImage(url);
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

  const handleFavoritos = () => {}
  
  
  return (
    <article className="pokemon">
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <div className="botones">
        <button onClick={handleCarrito} className="button"><b>Añadir al carrito</b></button>
        <Link to={`/${name}`}><button className="button"><b>Detalles</b></button></Link>
        <button onClick={handleFavoritos} className="button"><b>Favoritos</b></button>

      </div>
      {/* <h4>Apellidos: {apellidos}</h4>
      <p><b>email:</b> {url}</p>
      <p><b>role: </b> {role}</p> */}
      {/* <div className="edit_buttons">
        <Link to={`/edit/${_id}`}><button className="button"><b>Editar</b></button></Link>
        <button className="button" onClick={handleDelete}><b>Borrar</b></button>
      </div> */}
    </article>
  )
}

export default Pokemons;
