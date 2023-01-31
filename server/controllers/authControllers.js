//import { createHash, checkPassword } from "../config/hash";



const loginUser = (req, res) => {
    console.log(req.body)
    console.log(req.headers.Authentication)
    res.status(200).send({message: "login User", token: req.headers.Authentication})
}

const signupUser = async (req, res) => {
    res.status(200).send({message: "Signup User"})
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