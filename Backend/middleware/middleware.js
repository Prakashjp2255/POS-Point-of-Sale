const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

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
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token" });
    }
};

// Middleware to check roles
function checkRole(allowedRoles) {
    return function(req, res, next) {
        // if (!req.user) {
        //     return res.status(401).json({ message: "Unauthorized: No user found" });
        // }
        const userRole = req.body.role; // Correct this line
        console.log("User role: ", userRole); // Debugging statement

        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({ message: `Only ${allowedRoles.join(", ")} are allowed, not ${userRole}` });
        }
        next();
    };
}

function checkRoleUser(allowedRoles) {
    return function(req, res, next) {
        // if (!req.user) {
        //     return res.status(401).json({ message: "Unauthorized: No user found" });
        // }
        const userRole = req.user.role; // Correct this line
        console.log("User role: ", userRole); // Debugging statement

        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({ message: `Only ${allowedRoles.join(", ")} are allowed, not ${userRole}` });
        }
        next();
    };
}

// Router
module.exports = { authenticateToken, checkRole , checkRoleUser};
