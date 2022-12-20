const bcrypt = require('bcryptjs');
const SALT = process.env.SALT;

const createHash = async (password) => {
    try {
        const hash = bcrypt.hash(password, SALT);
        return hash;
    } catch (error) {
        console.log(`Error: ${error}`);
        return error;
    }
};

const checkPassword = async (password, hashedPassword) => {
    try {
        const result = await bcrypt.compare(password, hashedPassword);
        return result;
    } catch (error) {
        console.log(`Error: ${error}`);
        return error;
    }
};

module.exports = {
    createHash,
    checkPassword
};