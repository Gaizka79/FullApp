require('mongoose');
const jwt = require('jsonwebtoken');
const users = require('../models/users');
const userDB = require('../models/usersModel')
const { createHash } = require('../config/hash');

const loginUser = (req, res) => {
    res.status(200).send({message: "Login success!!", token: req.headers.Authentication})
}

const signupUser = async (req, res, next) => {
    try {
        if (!req.body.password) return res.status(400).send({message: "Password required!"})
        req.body.password = await createHash(req.body.password)
        req.body.email = req.body.email.toLowerCase();

        await userDB.postUser(req.body);

        const { email, nombre, role } = req.body;
        const token = jwt.sign(
            {email: email, nombre: nombre, role: role},
            'process.env.ACCES_TOKEN_SECRET',
            { expiresIn: '12h'});

        if (!token) return false
        req.headers.Authentication =`Bearer: ${token}`;
        return res.status(200).send({message: "signUP success!!", token: req.headers.Authentication})
    } catch (error) {
        console.error(`Error en signupUser: ${error}`)
        console.log(error)
        return res.status(500).send({message: error})
    }
}

const logout = async (req, res) => {
    res.status(200).send({message: "logout User"})
}

const authControllers = {
    loginUser,
    signupUser,
    logout
};

module.exports = authControllers;