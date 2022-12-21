const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nombre: {
        type: String
    },
    apellidos: {
        type: String
    },
    email: {
        type: String
    },
    role: {
        type: String
    }
});

module.exports = mongoose.model("users", userSchema);
