const express = require ('express');
const routesAuth = express.Router();

const { createToken, verifyToken } = require('../middlewares/auth_middleware');
const { loginUser, signupUser, getUserData, logout, favorites } = require('../controllers/authControllers');

routesAuth.post("/login", createToken, verifyToken, loginUser);
routesAuth.get("/login/:user", getUserData);
routesAuth.post("/signup", signupUser);//, createToken, verifyToken, loginUser);// (req, res) => {res.status(200).send(req.headers.Authentication)});
routesAuth.post("/logout", logout);
routesAuth.put("/favorites", favorites);

module.exports = routesAuth;
