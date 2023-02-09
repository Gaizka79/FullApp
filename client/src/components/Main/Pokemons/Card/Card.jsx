import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
//import { response } from "express";

function Card () {

  const params = useParams();
  const pokeName = params.nombre;
  
  const [ message, setMessage ] = useState(null);
  const [ values, setValues ] = useState({
    id: "",
    base_experience: "",
    height: "",
    name: "",
    weight: "",
    sprites: "",
    types: ""
  });
  
  const { id, base_experience, height, name, weight, sprites, types } = values;
  console.log(name, id, base_experience, height, weight, sprites.front_default, types[0].type.name);
  
  let navigate = useNavigate();

  useEffect(() => {
    const getDetails = async () => {
      await axios(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
        //.then((response) => console.log(response.data))
        .then((response) => setValues(response.data))
        .catch((error) => console.log(error))
    };
    getDetails();
    
  }, [pokeName]);
  
  const handleReturn = () => {
    return navigate("/", { replace: true });
  }
  const handleCarrito = () => {}
  const handleFavoritos = () => {}

  return (
    <article className="card">
      <h2>{name}</h2>
      <div className="detalles">
        <img src={sprites.front_default} alt={name} className="img_card" />
        <div className="barras">
          <p htmlFor="">Peso: {weight/10} Kg.</p>
          <p htmlFor="">Altura: {height/10} m.</p>
          <p htmlFor="">Tipo: {types[0].type.name}</p>
          <label htmlFor="experiencia">Experiencia:</label>
          <progress id="experiencia" max="255" value={base_experience} className="progress_bar"> 70% </progress>
        </div>
        <div className="description">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi est reprehenderit nesciunt dolore quae rerum quidem aut velit sint nobis. Debitis provident aspernatur voluptates natus.</p>
        </div>
      </div>
      
      <div className="botones">
        <button onClick={handleCarrito} className="button"><b>Añadir al carrito</b></button>
        <button onClick={handleFavoritos} className="button"><b>Favoritos</b></button>
        <button onClick={handleReturn} className="button"><b>Volver</b></button>
      </div>
      
    </article>)
}

export default Card;
