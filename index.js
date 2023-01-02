require("dotenv").config();
const path = require('path');
const express = require('express');
const app = express();

const connectDB = require('./server/config/mongoConfig');
const routesUser = require('./server/routes/routesUser');

const PORT = process.env.PORT || 5000;

const cors = require('cors');
const morgan = require('./server/middlewares/morganConfig');

require('body-parser');
require('./server/config/mongoConfig.js');

//app.use(morgan(':date[clf] :method :referrer :host :status :param[id] - :response-time ms :body'));
app.use(morgan("dev"));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, './client/build')));

app.use('/', routesUser);

app.get('/api', (req, res) => {
    console.log("Solicitud recibida");
    res.status(200).json({ message: "Kaixo munduari!" })
});

app.listen(PORT, async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        console.log(`Server listening in port ${PORT}...`)
    } catch (error) {
        console.log(`Error: ${error}`);
    }
});