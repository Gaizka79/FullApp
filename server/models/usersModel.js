require('mongoose');
const users = require('./users');

const getAllUsers = async () => {
    try {
        return await users.find({});
    } catch (error) {
        throw(error);
    }
};

const getUserById = async (userId) => {
    try {
        return await users.findById({ _id: userId });
    } catch (error) {
        throw(error);
    }
};

const getUserByName = async (userName) => {
    try {
        return await users.findOne({ nombre: userName });
    } catch (error) {
        throw(error);
    }
};

const postUser = async (user) => {
    try {
        const newUser = new users(user);
        await users.create(newUser);
    } catch (error) {
        throw(error);
    }
};

const editUser = async (filter, update) => {
    return await users.findOneAndUpdate( { _id: filter}, update, { new: true })
};

const deleteUser = async (id) => {
    try {
        return await users.deleteOne({ _id: id });
    } catch (error) {
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