const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const productRoutes = require('./routes/userproductRoutes.js');
const userloginRoutes = require('./routes/usersigninRoutes.js');
const usersigninRoutes = require('./routes/usersigninRoutes.js');

const app = express();
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 4000;
const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL)
    .then(() => {
        console.log("database connected successfully");
        app.listen(PORT, () => {
            console.log(`server is running on this port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });


    

app.use('/admin', usersigninRoutes);
app.use('/admin', productRoutes);



