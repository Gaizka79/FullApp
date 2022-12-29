import React from "react";
import { useContext } from "react";
import axios from "axios";

import { userContext } from "../../../context/userContext";
//import useAxios from "../../../hooks/useAxios";

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

        /* const { response, error } = useAxios();
        response ? setUsers(response) : console.log(`Error: ${error}`); */

    } catch (error) {
      console.log(`Error: ${error}`);
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
      <div className="product_buttons">
        <button className="button_primary"><b>Editar</b></button>
        <button className="button_primary" onClick={handleDelete}><b>Borrar</b></button>
      </div>
    </article>
  )
}

export default User;
