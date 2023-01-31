require('mongoose');
const users = require('../models/users');
const userDB = require('../models/usersModel')

const loginUser = (req, res) => {
    console.log(req.body)
    console.log(req.headers.Authentication)
    res.status(200).send({message: "login User", token: req.headers.Authentication})
}

const signupUser = async (req, res, next) => {
    try {
        await userDB.postUser(req.body);
        next();
        //res.status(200).send({ message: "User succesfully created!" });
    } catch (error) {
        console.error(`Error en signupUser: ${error}`)
        res.status(500).json({message: error})
        //throw(error);
    }
    //res.status(200).send({message: "Signup User"})
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