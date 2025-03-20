const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');
const fetch = require('node-fetch');

// Load environment variables from .env file
dotenv.config();

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
};

// Import route modules
const productRoutes = require('./routes/userproductRoutes.js');
const userloginRoutes = require('./routes/usersigninRoutes.js');
const inventoryRoutes = require('./routes/inventoryRoutes.js');
const taxRoutes = require('./routes/taxRoutes.js');

const app = express();

// Middleware setup
app.use(cors(corsOptions));
app.use(express.json());

// Database connection
const PORT = process.env.PORT || 4000;
const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL)
    .then(() => {
        console.log("Database connected successfully");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });

// Routes setup
app.use('/admin/users', productRoutes);  //  Products route first
app.use('/admin/users', userloginRoutes);        //  Then user routes
app.use('/admin/users', inventoryRoutes);
app.use('/admin/users', taxRoutes);

// CORS headers setup
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // Handle preflight requests
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }

    next();
});

// Function to make POST requests
function makePostRequest(url, token, payload) {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}

// Your other routes and middleware can go here

// Example usage of makePostRequest function
// const url = 'http://localhost:4000/admin/users/67d0368...';
// const token = 'yourToken';  // Replace with the actual token
// const payload = { /* your request payload */ };
// makePostRequest(url, token, payload);
