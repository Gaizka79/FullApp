const bcrypt = require('bcryptjs');

const SALT = process.env.SALT;

const createHash = async (password) => {
    return await bcrypt.hash(password, 10)
    /* try {
        console.log(process.env.SALT)

        const hash = bcrypt.hash(password, SALT, (err, hash) => {
            if (err) return err
            console.log(`Hashed password: ${hash}`)
        });
        return hash;
    } catch (error) {
        console.log(`Error: ${error}`);
        return false;
    } */
};

const checkPassword = async (password, hashedPassword) => {
    try {
        const result = await bcrypt.compare(password, hashedPassword);
        return result;
    } catch (error) {
        console.error(`Error en checkPassword: ${error}`);
        return error;
    }
};

module.exports = {
    createHash,
    checkPassword
};