require('mongoose');
const db = require('../config/mongoConfig');
const userDB = require('../models/usersModel');

const getUsers = async (req, res) => {
    console.log("Estamos en getUsers");
    try {
        const allUsers = await userDB.getAllUsers();
        //console.log(allUsers);
        res.status(200).json(allUsers);
    } catch (error) {
        console.log(`Error en getUsers: ${error}`);
        throw(error);
    }
};

const getById = async (req, res) => {
    console.log(req.params.id);
    try {
        const oneUser = await userDB.getUserById(req.params.id);
        console.log(oneUser);
        res.status(200).json(oneUser);
    } catch (error) {
        console.log(`Error en getById: ${error}`)
        throw(error);
    }
};

const getByName = async (req, res) => {
    console.log(req.params.name);
    try {
        const oneUser = await userDB.getUserByName(req.params.name);
        console.log(oneUser);
        res.status(200).send(oneUser);
    } catch (error) {
        console.log(`Error en getByName: ${error}`)
        throw(error);
    }
};

const addUser = async (req, res) => {
    try {
        await userDB.postUser(req.body);
        res.status(200).send({ message: "User succesfully created!" });
    } catch (error) {
        console.log(`Error en addUser: ${error}`)
        throw(error);
    }
};

const putUser = async (req, res) => {
    const filter = req.params.id;
    const update = {
        nombre: req.body.nombre,
        //id: req.params.id,
        apellidos: req.body.apellidos,
        email: req.body.email,
        role: req.body.role
    };
    console.log(filter);
    console.log(update)
    
    try {
        await userDB.editUser(filter, update)
            .then((response) => response  
                ? res.status(200).json({ message: `Usuario con id:${filter} editado OK! Con los datos: ${response}` }) 
                : res.status(400).json({ message: `Usuario con id:${filter} NO ENCONTRADO!` }) 
            )
    } catch (error) {
        console.log(`Error en putUser: ${error}`)
    }
};

const deleteUser = async (req, res) => {
    try {
        await userDB.deleteUser(req.params.id)
        .then((response) => response.deletedCount == "1"  
          ? res.status(200).json({ message: `Usuario con id:${req.params.id} eliminado OK!` }) 
          : res.status(400).json({ message: `Usuario con id:${req.params.id} NO ENCONTRADO!` })
        )
    } catch (error) {
        console.log(`Error en deleteUser: ${error}`)
    }
}

const userControllers = {
    getUsers,
    getById,
    getByName,
    addUser,
    putUser,
    deleteUser
};

module.exports = userControllers;