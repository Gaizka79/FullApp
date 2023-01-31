const express = require ('express');
const routesAuth = express.Router();

const { createToken, verifyToken } = require('../middlewares/auth_middleware');
const { loginUser, signupUser, logout } = require('../controllers/authControllers');

routesAuth.post("/login", createToken, verifyToken, loginUser);
routesAuth.post("/signup", signupUser, createToken, verifyToken, (req, res) => {res.status(200).send(req.headers.Authentication)});
routesAuth.post("/logout", logout);

module.exports = routesAuth;
