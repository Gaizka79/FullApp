require('mongoose');
const db = require('../config/mongoConfig');
const userDB = require('../models/usersModel');

const getUsers = async (req, res) => {
    console.log("Estamos en getUsers");
    try {
        const allUsers = await userDB.getAllUsers();
        console.log(allUsers);
        res.status(200).json(allUsers);
    } catch (error) {
        console.log(`Error en getUsers: ${error}`);
        throw(err);
    }
};

const getById = async (req, res) => {
    console.log(req.params.id);
    try {
        const oneUser = await userDB.getUserById(req.params.id);
        console.log(oneUser);
        res.status(200).send(oneUser);
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
    console.log(req.body);
    try {
        await userDB.postUser(req.body);
        res.status(200).send({ message: "User succesfully created!" });
    } catch (error) {
        console.log(`Error en addUser: ${error}`)
        throw(error);
    }
};

const putUser = async (req, res) => {
    console.log(req.body);
    console.log("arriba req.body abajo req.paramas");
    console.log(req.params);
    /* const toEdit = {
        filter: req.params.id,
        update: req.body
    }; */
    const filter = req.params.id;
    //const update = { nombre, apellidos, email, role } = req.body;
    let update = {
        nombre: req.body.nombre,
        //id: req.params.id,
        apellidos: req.body.apellidos,
        email: req.body.email,
        role: req.body.role
    };
    console.log("Ahora se muestra update");
    console.log(update)
    await userDB.editUser(filter, update)
        .then((filter) => res.status(200).send({ message: `Usuario con id:${filter} editado OK!` }))
        .catch((error) => res.status(500).send({ message: `Error ${error} editando al usuario` }));
};

const deleteUser = async (req, res) => {
    await userDB.deleteUser(req.params.id)
    .then((id) => res.status(200).send({ message: `Usuario con id: ${id} borrado.`}))
    .catch((error) => res.status(500).send({ message: `Error: ${error}`}));
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