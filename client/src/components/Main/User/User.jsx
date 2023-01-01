import React from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";//
import axios from "axios";

import Edit from "./Edit/Edit";
import New from "./New/New";
import { Link } from "react-router-dom";

import { userContext } from "../../../context/userContext";
import { useState } from "react";
//import useAxios from "../../../hooks/useAxios";

function User (props) {

  const { setUsers } = useContext(userContext);
  const { nombre, apellidos, email, role, _id } = props.value;
  const { register, handleSubmit } = useForm();//

  const [ edit, setEdit ] = useState(false)

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

  const handleEdit = async (event) => {
    //event.preventDefault();
    console.log("mierda de edit");
    console.log(props.value);
    //<Link to={"/new"}></Link>
    return (
      //<New data={props.value} key={1}/>
      <Link to={"/new"} data={props.value}/>
    )
    //<Link to={"/new"}/>
    /* return (
      <New value={event.target} key={1}/>
    ) */
  }

  const buttonEdit = (event) => {
    console.log(edit);
    handleEdit(event)
    setEdit(!edit);
    
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
          {/* {!edit ?
            <button className="button_primary" onClick={buttonEdit}><b>Editar</b></button>
            : <button className="button_primary" onClick={buttonEdit}><b>Guardar</b></button>
          } */}
          <Link to={`/edit/${_id}`} value={props.value}>Editar</Link>
          <button className="button_primary" onClick={handleDelete}><b>Borrar</b></button>
        </div>
    </article>
  )
}

export default User;
