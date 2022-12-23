import React from "react";

function User (props) {

  const { nombre, apellidos, email, role, _id } = props.value;

  return (
    <article className="producto">
      <p className="_id">Id: {_id}</p>
      <h2>{nombre}</h2>
      <h4>Apellidos: {apellidos}</h4>
      <p><b>email:</b> {email}</p>
      <p><b>role: </b> {role}</p>
      {/* {foto ? <img src={foto} alt="argazkia" /> :
        <img src={noImage} alt="argazkia" />} */}
      {/* <div className="product_buttons">
        <button className="putBt"><b>Editar</b></button>
        <button className="deleteBt"><b>Borrar</b></button>
      </div> */}
    </article>
  )
}

export default User;
