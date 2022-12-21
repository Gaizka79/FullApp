require('mongoose');
const users = require('./users');

const getAllUsers = async () => {
    console.log("Estamos en getAllUsers");
    try {
        const allUsers = await users.find({});
        return allUsers;
    } catch (error) {
        console.log(`Error en getAllUsers: ${error}`);
        throw(error);
    }
};

const getUserById = async (userId) => {
    console.log("En getUserById");
    console.log(userId);
    try {
        const userById = await users.findById({ _id: userId });
        return userById;
    } catch (error) {
        console.log(`Error en getUserById: ${error}`);
        throw(error);
        
    }
};

const getUserByName = async (userName) => {
    console.log("En getUserByName");
    console.log(userName);
    try {
        const userByName = await users.findOne({ nombre: userName });
        return userByName;
    } catch (error) {
        console.log(`Error en getUserByName: ${error}`);
        throw(error);
        
    }
};

const postUser = async (user) => {
    console.log("En postUser");
    console.log(user);
    try {
        const newUser = new users(user);
        await users.create(newUser);
        console.log(newUser);
    } catch (error) {
        console.log(`Error en postUser: ${error}`);
        throw(error);
        
    }
};

const editUser = async (filter, update) => {
    console.log("En editUser");
    console.log(filter + " " + update.nombre);
    try {
        //await users.findOneAndUpdate( { _id: userId }, { nombre: userNombre }, { new: true });
        await users.findOneAndUpdate( { _id: filter}, update, { new: true });
    } catch (error) {
        console.log(`Error en editUser: ${error}`);
        throw(error);
    }
};

const deleteUser = async (id) => {
    console.log("En deleteUser");
    console.log(id);
    try {
        await users.deleteOne({ _id: id });
    } catch (error) {
        console.log(`Error en deleteUser: ${error}`);
        throw(error);
        
    }
};

const userDb = {
    getAllUsers,
    getUserById,
    getUserByName,
    postUser,
    editUser,
    deleteUser
}

module.exports = userDb;