require('../config/hash');
require('mongoose');

const users = require('../models/users');

const getUser = async (req) => {
    console.log("en getuser")
    //console.log(req.body)
    const nombre = req?.body?.nombre || req
    console.log("nombre: " + nombre)
    try {
        const user = await users.findOne({ nombre: nombre });
        if (!user) return false// {message: "Usuario no encontrado"}
        return user

    } catch (error) {
        console.error(`Error en getUser: ${error}`)
        throw(error);
    }
}

module.exports = {
    getUser
}