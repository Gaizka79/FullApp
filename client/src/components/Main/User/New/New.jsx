import React from "react";
import { useState } from "react";

import axios from "axios";

function New () {

  const [ values, setValues ] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    role: ""
  });

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      await axios.post("/users/create", values)
        .then((response) => console.log(response.data))
    } catch (error) {
      console.log(`Error: ${error}`);
    }
    console.log(event);
    
  }

  const handleChange = event => {
    event.preventDefault();
    
    const { target } = event;
    const { name, value } = target;
    const newValues = {...values, [name]: value};
    setValues(newValues);
  }


  return (
    <form onSubmit={handleSubmit} className="new">
      <p>Crear</p>
      <label htmlFor="nombre">Nombre:</label>
      <input 
        type="text"
        name="nombre"
        value={values.nombre}
        onChange={handleChange} />

      <label htmlFor="apellidos">Apellidos:</label>
      <input 
        type="text"
        name="apellidos"
        value={values.apellidos}
        onChange={handleChange} />

      <label htmlFor="email">email:</label>
      <input 
        type="text"
        name="email"
        value={values.email}
        onChange={handleChange} />

      <label htmlFor="role">Role:</label>
      <select name="role" id="role" onChange={handleChange}>
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>

      <button type="submit">Añadir</button>
      
    </form>
  )
}

export default New;
