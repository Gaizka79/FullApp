import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { userContext } from "../../../context/userContext";
import axios from "axios";

function User (props) {

  const { setUsers } = useContext(userContext);
  const { nombre, apellidos, email, role, _id } = props.value;


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
        <p className="_id">Id: {_id}</p>
        <h2>{nombre}</h2>
        <h4>Apellidos: {apellidos}</h4>
        <p><b>email:</b> {email}</p>
        <p><b>role: </b> {role}</p>
        {/* {foto ? <img src={foto} alt="argazkia" /> :
          <img src={noImage} alt="argazkia" />} */}
        <div className="edit_buttons">
          <Link to={`/edit/${_id}`}><button className="button"><b>Editar</b></button></Link>
          <button className="button" onClick={handleDelete}><b>Borrar</b></button>
        </div>
    </article>
  )
}

export default User;
