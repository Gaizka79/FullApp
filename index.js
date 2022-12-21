require("dotenv").config();
const path = require('path');
const express = require('express');
require('body-parser');

require('./server/config/mongoConfig.js');
const connectDB = require('./server/config/mongoConfig');

const cors = require('cors');
const morgan = require('./server/middlewares/morganConfig');

const routesUser = require('./server/routes/routesUser');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(morgan(':date[clf] :method :referrer :host :status :param[id] - :response-time ms :body'));

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* app.use(express.static(path.resolve(__dirname, '../client/build'))); */
app.use(express.static(path.join(__dirname, './client/build')));

app.use('/', routesUser);

app.get('/api', (req, res) => {
    console.log("Petición realizada");
    res.status(200).json({ message: "Kaixo munduari!" })
});

/* app.get('/*', (req, res) => {
    // res.sendFile(path.resolve(__dirname, '../client/build', 'index.html')); 
    res.sendFile(path.join(__dirname, './client/build/index.html'));
}); */

app.listen(PORT, async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        console.log(`Server listening in port ${PORT}...`)
    } catch (error) {
        console.log(`Error: ${error}`);
    }
});