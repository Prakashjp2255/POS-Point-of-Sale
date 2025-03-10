const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const user = require('../model/userModel');

const authenticateToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Verified User: ", verified); // Debugging
        req.user = verified; // Ensure this includes the role
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token" });
    }
};



module.exports = authenticateToken ;

