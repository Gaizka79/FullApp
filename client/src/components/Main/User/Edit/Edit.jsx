import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios"; 

function Edit () {

  const params = useParams();
  const { register, handleSubmit } = useForm();
  const [ message, setMessage ] = useState(null);
  const [ values, setValues ] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    role: ""
  });

  const { nombre, apellidos, email, role } = values
  let navigate = useNavigate();

useEffect (() => {
  const getUser = async () => {
    await axios.get(`/users/id/${params._id}`)
      .then((res) => {
        setValues(res.data)
      })
      .catch((err) => {
        console.log(`Error: ${err}`)
        setMessage(err)
      })
  }
  getUser();
},[params._id])

  const onSubmit = async () => {
    try {
      await axios.put(`/users/edit/${params._id}`, values)
        .then((response) => console.log(response.data))
    } catch (error) {
      console.log(`Error: ${error}`);
      setMessage(error);
    }
    setMessage("Usuario editado OK");
    setTimeout(() => {
      return navigate("/", { replace: true });
    }, 1500);
  }

  const handleChange = event => {
      event.preventDefault();
      const { target } = event;
      const { name, value } = target;
      const newValues = {...values, [name]: value};

      setValues(newValues);
  }

  const handleCancel = () => {
    setMessage("Cambios no guardados")
    setTimeout(() => {
      return navigate("/", { replace: true });
    }, 1500);
  }

  return (
    <form  onSubmit={handleSubmit(onSubmit)} className="edit container">
      <p>Editar</p>
      <label htmlFor="nombre">Nombre:</label>
      <input 
        {...register("nombre")}
        type="text"
        name="nombre"
        value={nombre}
        onChange={handleChange}/>

      <label htmlFor="apellidos">Apellidos:</label>
      <input {...register("apellidos")}
        type="text"
        name="apellidos"
        value={apellidos}
        onChange={handleChange}/>

      <label htmlFor="email">email:</label>
      <input {...register("email")}
        type="text"
        name="email"
        value={email}
        onChange={handleChange}/>

      <label htmlFor="role">Role:</label>
      <select 
        {...register("role")}
        name="role" 
        id="role" 
        value={role}
        onChange={handleChange}>
          <option value="admin">Admin</option>
          <option value="user">User</option>
      </select>

      <button type="submit" className="button">Aceptar</button>
      {/* <input type="button" value="Cancelar" onClick={handleCancel} className="button"/> */}
      <button className="button" onClick={handleCancel}>Cancelar</button>

      {message ?
        <p>{message}</p> :
        <></>
      }
    </form>
  )
}

export default Edit;
