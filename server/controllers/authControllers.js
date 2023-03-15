require('mongoose');
const jwt = require('jsonwebtoken');
const users = require('../models/users');
const userDB = require('../models/usersModel')
const { createHash } = require('../config/hash');
const { getUser } = require('../services/auth_services');

const loginUser = (req, res) => {
    //res.status(200).send({message: "Login success!!", token: req.headers.Authentication, favorites: req.headers.Favorites})

    const loginOK = { message: "Login success!!", 
                    token: req.headers.Authentication, 
                    favorites: req.headers.Favorites }

    res.status(200).send(loginOK)
    //res.status(200).send({message: "Login success!!", token: req.headers})
}

const signupUser = async (req, res, next) => {
    try {
        if (!req.body.password) return res.status(400).send({message: "Password required!"})
        req.body.password = await createHash(req.body.password)
        req.body.email = req.body.email.toLowerCase();

        await userDB.postUser(req.body);

        const { email, nombre, role } = req.body;
        const token = jwt.sign(
            {email: email, nombre: nombre, role: role},
            'process.env.ACCES_TOKEN_SECRET',
            { expiresIn: '12h'});

        if (!token) return false
        req.headers.Authentication =`Bearer: ${token}`;
        return res.status(200).send({message: "signUP success!!", token: req.headers.Authentication})
    } catch (error) {
        console.error(`Error en signupUser: ${error}`)
        console.log(error)
        return res.status(500).send({message: error})
    }
};

const getUserData = async (req, res) => {   //aki lo dejamos!!!!
    console.log("en getuserData de authcontroller")
    console.log(req.params.user)
    const usuario = await getUser(req.params.user)
    console.log("a ver ke deuelve ahora")
    console.log(usuario)
    console.log("hasta aki usuario")
    //return res.status(200).send({message: req.params.user})
    return res.status(200).json(usuario)
}

const favorites = async (req, res) => {
    console.log("en favorites")

    const { id, nombre } = req.body;
    console.log(id, nombre);

    const usuario = await getUser(nombre)
    console.log("y nos devuelve......")
    console.log(usuario)
    console.log(usuario.favorites)

    const { favorites, _id } = usuario;

    let newFavorites = () => {
        if (favorites.includes(id)) {
            console.log("esta incluido")
            
            const result = favorites.filter((favo) => favo != id)
            return result
        } else {
            console.log("no esta incluido")
            favorites.push(req.body.id)
            return favorites
        }
    }
    //await newFavorites();
    console.log("El result es.....")
    //console.log(await newFavorites())
    let updateFavorites = await newFavorites();
    console.log(updateFavorites)

    const filter = _id;
    const update = { favorites: updateFavorites };
    console.log(filter);
    console.log(update)
    
    try {
        await userDB.editUser(filter, update)
            .then((response) => response  
                ? res.status(201).json({ message: `Usuario con nombre:${filter} editado OK! Con los datos: ${response}` }) 
                : res.status(400).json({ message: `Usuario con nombre:${filter} NO ENCONTRADO!` }) 
            )
    } catch (error) {
        console.error(`Error en putUser: ${error}`)
        res.status(500).json({message: error})
    }


    //res.status(201).send({ message: "en favorites"})
}

const logout = async (req, res) => {
    res.status(200).send({message: "logout User"})
}

const authControllers = {
    loginUser,
    signupUser,
    getUserData,
    favorites,
    logout
};

module.exports = authControllers;