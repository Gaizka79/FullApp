import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

//import bcrypt from "bcryptjs-react";
//import Signup from '../Signup/Signup';
import axios from 'axios';

import { loginContext } from '../../../../context/loginContext';

//import { v4 as uuidv4 } from 'uuid';
//import { response } from 'express';
//import { response } from 'express';

function Login () {
  const { loginUser, setLoginUser, token, setToken } = useContext(loginContext);/* , token, setToken */ 
  const [ values, setValues ] = useState({
    nombre: "",
    email: "",
    password: "",
    role: "user"
  });

  const [ loginForm, setLoginForm ] = useState(true)
  const [ message, setMessage ] = useState(null);

  const { register, handleSubmit } = useForm();
  let navigate = useNavigate();

  const onLoginSubmit = async () => {
    try {
      if (!values.password) return setMessage("Password is required!!")
      if (!values.nombre) return setMessage("Nombre is required!")
      
      const request = await axios
        .post("http://localhost:3001/login",
        values)

      let firstToken = request.data.token.split(" ")[1]
      localStorage.setItem('token', firstToken);
      setLoginUser(values.nombre)
      
      setMessage("Login OK!")
      
    } catch (error) {
      console.error(`Error en login React: ${error}`);
      setMessage(error.response.data.message);
    } finally {
      setTimeout(() => {
        return navigate("/", { replace: true });
      }, 1500);
    }
  }

  const onSignupSubmit = async () => {
    try{
      if (!values.password) return setMessage("Password is required!!")
      for (let value in values){
        if (!values[value]) return setMessage("Todos los campos son obligatorios!")
      }
      const request = await axios
        .post("http://localhost:3001/signup",
        values)

      let firstToken = request.data.token.split(" ")[1]
      localStorage.setItem('token', firstToken);
      
      setLoginUser(values.nombre)
      setMessage("Signup OK!")

    } catch (error) {
      console.error(`Error en Signup react: ${error}`)
      setMessage(error.response.data.message);
    }
  }

  const handleLoginForm = event => {
    setMessage(null);
    setLoginForm(!loginForm);
  }

  const handleInvitado = () => {
    setMessage(null);
    document.getElementsByName("nombre")[0].value = "Invitado";
    document.getElementsByName("password")[0].value = "usuarioinvitado";
    const newValues = {nombre: "Invitado", password: "usuarioinvitado"}
    setValues(newValues)
  }

  const handleChange = event => {
    event.preventDefault();
    setMessage(null);

    const { target } = event;
    const { name, value } = target;
    const newValues = {...values, [name]: value};
    setValues(newValues);
  }

  return (
    <>
      {loginForm ?
        <form onSubmit={handleSubmit(onLoginSubmit)} className="login container">
          <h2>Login</h2>
          <label htmlFor="nombre">Nombre:</label>
          <input 
            {...register("nombre")}
            type="text"
            name='nombre'
            value={values.nombre}
            placeholder="Nombre de usuario"
            onChange={handleChange} />

          <label htmlFor="password">Password:</label>
          <input 
            {...register("password")}
            type="password"
            name='password'
            value={values.password}
            placeholder="Contraseña..."
            onChange={handleChange} />

          <button type="submit" className="button">Login</button>
          <button onClick={handleSubmit(handleInvitado)} className="button">Invitado</button>
          <button onClick={handleSubmit(handleLoginForm)} className="button">New user</button>
          { message && <p>{message}</p>}
        </form> 
        : 
        <form onSubmit={handleSubmit(onSignupSubmit)} className="login container">
          <h2>Sign up</h2>
          <label htmlFor="nombre">Nombre:</label>
          <input 
            {...register("nombre")}
            type="text"
            name='nombre'
            value={values.nombre}
            placeholder="Nombre de usuario"
            onChange={handleChange} />

          <label htmlFor="email">Email:</label>
          <input 
            {...register("email")}
            type="text"
            name='email'
            value={values.email}
            placeholder="email"
            onChange={handleChange} />

          <label htmlFor="password">Password:</label>
          <input 
            {...register("password")}
            type="password"
            name='password'
            value={values.password}
            placeholder="Contraseña..."
            onChange={handleChange} />

          <label htmlFor="role">Role:</label>
          <select 
            {...register("role")}
            name="role" 
            id="role" 
            onChange={handleChange}
            defaultValue={"user"}>
              <option value="admin">Admin</option>
              <option value="user">User</option>
          </select>
          <button type="submit" className="button">Save</button>
          <button onClick={handleSubmit(handleLoginForm)} className="button">Go to Login</button>
          { message && <p>{message}</p>}
        </form>
        
      }
      
    </>
  )
}

export default Login;
