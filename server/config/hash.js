const bcrypt = require('bcryptjs');

const SALT = process.env.SALT;

const createHash = async (password) => {
    return await bcrypt.hash(password, 10)
    /* try {
        console.log(process.env.SALT)

        const hash = bcrypt.hash(password, 10, (err, hash) => {
            //if (err) return console.log(`Error: ${err}`)
            console.log(`Hashed password: ${hash}`)
        return hash;
        });
    } catch (error) {
        console.log(`Error en createHash: ${error}`);
        return false;
    } */
};

const checkPassword = async (password, hashedPassword) => {
    try {
        console.log(password + " " + hashedPassword)
        const result = await bcrypt.compare(password, hashedPassword);
        return result;
    } catch (error) {
        console.error(`Error en checkPassword: ${error}`);
        return false;
    }
};

module.exports = {
    createHash,
    checkPassword
};