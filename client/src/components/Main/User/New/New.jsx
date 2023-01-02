import React, { useState } from "react";
import { useForm } from "react-hook-form";//
import { useNavigate } from "react-router-dom";//

import axios from "axios";

function New () {

  const [ values, setValues ] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    role: "user"
  });

  const { register, handleSubmit } = useForm();//
  let navigate = useNavigate();//

  const [ message, setMessage ] = useState(null);

  const onSubmit = async event => {
    try {
      await axios.post("/users/create", values)
        .then((response) => console.log(response.data))
    } catch (error) {
      console.log(`Error: ${error}`);
    }
    console.log(event);
    setMessage("Usuario creado OK");
    setTimeout(() => {
      return navigate("/", { replace: true });//
    }, 1500);
  }

  const handleChange = event => {
    event.preventDefault();
    console.log(register)
    setMessage(null);
    
    const { target } = event;
    const { name, value } = target;
    const newValues = {...values, [name]: value};
    setValues(newValues);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="new"> {/* Añadido onSubmit */}
      <p>Crear</p>
      <label htmlFor="nombre">Nombre:</label>
      <input 
        {...register("nombre")}//
        type="text"
        name="nombre"
        value={values.nombre}
        onChange={handleChange} />

      <label htmlFor="apellidos">Apellidos:</label>
      <input 
        {...register("apellidos")}//
        type="text"
        name="apellidos"
        value={values.apellidos}
        onChange={handleChange} />

      <label htmlFor="email">email:</label>
      <input 
        {...register("email")}//
        type="text"
        name="email"
        value={values.email}
        onChange={handleChange} />

      <label htmlFor="role">Role:</label>
      <select 
        {...register("role")}//
        name="role" 
        id="role" 
        onChange={handleChange}>
          <option value="admin">Admin</option>
          <option value="user" selected>User</option>
      </select>

      <button type="submit" className="button">Añadir</button>

      {message ?
        <p>{message}</p> :
        <></>
      }
    </form>
  )
}

export default New;
