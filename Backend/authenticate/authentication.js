const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const user = require('../model/userModel');

exports.protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await user.findById(decoded.id).select('-password');

            next();
            console.log("Authorization successful!");

        } catch (error) {
            console.error("Error in authorization:", error);
            res.status(401).json({ error: "NOT AUTHORIZED" });
        }
    } else {
        res.status(401).json({ error: "NOT AUTHORIZED, NO TOKEN GENERATED" });
    }
});
