const jwt = require('jsonwebtoken');
const { getUser } = require('../services/auth_services');

const createToken = async (req, res, next) => {
    const user = await getUser(req)

    if (!user) return res.status(400).send({message: "Usuario no encontrado!!!!!!"})
    if (user.message) return res.status(400).send(user.message)
    
    const { email, role, nombre } = user;
        
    try {
        const token = jwt.sign(
            {email: email, nombre: nombre, role: role},
            'process.env.ACCES_TOKEN_SECRET',
            { expiresIn: '12h'});

        if (!token) return false
        req.headers.Authentication =`Bearer: ${token}`;
        next()
    } catch (error) {
        console.error(`Error en createToken: ${error}`)
    }
}

const verifyToken = async (req, res, next) => {
    if (!req.headers.authentication) return res.status(403).send({message: "Token not found!"})

    const token = req.headers.authentication;
    jwt.verify(token, 'process.env.ACCES_TOKEN_SECRET', (error, decoded) => {
        if (error) return res.status(403).send({message: error.message})
        next()
    })
}

module.exports = { createToken, verifyToken };