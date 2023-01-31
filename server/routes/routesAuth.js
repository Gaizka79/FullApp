const express = require ('express');
const routesAuth = express.Router();

const { createToken, verifyToken } = require('../middlewares/auth_middleware');
const { loginUser, signupUser, logout } = require('../controllers/authControllers');

routesAuth.post("/login",createToken, loginUser);
routesAuth.post("/signup",verifyToken, signupUser);
routesAuth.post("/logout", logout);

module.exports = routesAuth;
