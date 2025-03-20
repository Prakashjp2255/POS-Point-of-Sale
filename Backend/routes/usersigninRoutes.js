const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const usersigninController = require('../controller/usersigninController');
const { authenticateToken, checkRoleUser } = require('../middleware/middleware');

// ✅ User Authentication Routes
router.post('/signup', usersigninController.createUser);
router.post('/login', usersigninController.loginUser);

// ✅ Fetch All Users
router.get('/', authenticateToken, checkRoleUser(['admin', 'agent']), usersigninController.fetchUsers);

// ✅ Fetch User by ID (Must be defined **after all specific routes**)
router.get('/:id', authenticateToken, checkRoleUser(['admin', 'agent']), usersigninController.fetchUsersbyid);

// ✅ Update User
router.put('/:id', authenticateToken, checkRoleUser(['admin', 'agent']), usersigninController.updateUser);

// ✅ Delete User
router.delete('/:id', authenticateToken, checkRoleUser(['admin', 'agent']), (req, res, next) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ error: 'Invalid user ID format' });
    }
    next();
}, usersigninController.deleteUser);

module.exports = router;


// Only agents can update their details

// router.post('/users/signup',checkRole(['agent']) , usersigninController.createUser);
// router.post('/users/login', usersigninController.loginUser);

// router.put('/users/:id', authenticateToken, checkRole(['agent']), async (req, res, next) => {
//     if (req.user.id !== req.params.id) {
//         return res.status(403).json({ message: "Access denied." });
//     }
//     next();
// }, usersigninController.updateUser);


