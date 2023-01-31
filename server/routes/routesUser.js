const express = require('express');
const routesUser = express.Router();

const { getUsers, getById, getByName, addUser, putUser, deleteUser } = require('../controllers/userControllers');
const { verifyToken } = require('../middlewares/auth_middleware');

routesUser.get('/users', verifyToken, getUsers);
routesUser.get('/users/id/:id', getById);
routesUser.get('/users/name/:name', getByName);
routesUser.post('/users/create', addUser);
routesUser.put('/users/edit/:id', putUser);
routesUser.delete('/users/delete/:id', deleteUser);

module.exports = routesUser;