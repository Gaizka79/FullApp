import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { userContext } from "../../../context/userContext";
import axios from "axios";

function User (props) {

  const { setUsers } = useContext(userContext);
  const { nombre, apellidos, email, role, _id } = props.value;
  const { name, url } = props.value;
  const [ image, setImage ] = useState(null);


  useEffect(() => {
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

  
  
  return (
    <article className="user">
        <img src={image} alt={name} />
        <h2>{name}</h2>
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

export default User;
