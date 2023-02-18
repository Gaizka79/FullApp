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
    abilities: [],
    types: []
  });
  const [ habilidad, setHabilidad ] = useState(null);
  const [ tipo, setTipo ] = useState(null);
  let ability, type;
  
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

  const { id, base_experience, height, name, weight, sprites, abilities, types } = values;

  useEffect(() => {
    const getAbilities = async () => {
      if (abilities[0]?.ability?.url) (ability = abilities[0].ability.url) 
        else return
      if (types[0]?.type?.name) (setTipo(types[0].type.name))
        else return
      console.log(type)
      await axios(ability)
        .then((response) => response.data)
        .then((response) => setHabilidad(response.effect_entries[1].effect))
        .catch((error) => console.error(error))
    }
    getAbilities();
  }, [values])
 
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
          <p htmlFor="">Tipo: {tipo} {/*types [0].type.name */}</p>
          <label htmlFor="experiencia">Experiencia:</label>
          <progress id="experiencia" max="255" value={base_experience} className="progress_bar"> {base_experience} </progress>
        </div>
        <div className="description">
          <p>{habilidad}</p>
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
