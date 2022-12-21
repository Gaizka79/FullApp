const mongoose = require('mongoose');

const connectDB = async (url) => {
    try {
        mongoose.connect(url)
        .then(() => console.log("Mongo DB konektatua!!"));
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}

module.exports = connectDB;