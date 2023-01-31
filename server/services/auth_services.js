require('../config/hash');
require('mongoose');
const { createHash, checkPassword } = require('../config/hash');
const users = require('../models/users');

const getUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await users.findOne({ email: email });

        if (!user) return false// {message: "Usuario no encontrado"}

        //Modificar antes de terminar el proyecto!!!!
        const hashedPassword = await createHash(password);
        console.log(hashedPassword)
        //Leer los passwords desde la BDD

        if (await checkPassword(password, hashedPassword)) return user
        console.log("Password incorrecto!")
        return ({message: "Incorrect password!!"})
    } catch (error) {
        console.error(`Error en getUser: ${error}`)
        throw(error);
    }
}

module.exports = {
    getUser
}