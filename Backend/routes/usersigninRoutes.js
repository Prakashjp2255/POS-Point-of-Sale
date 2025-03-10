const express = require('express');
const router = express.Router();
const usersigninController = require('../controller/usersigninController');
const { authenticateToken, checkRole, checkRoleUser } = require('../middleware/middleware');
 
// Only admin can access these routes
router.post('/admin/users/signup', usersigninController.createUser);
router.post('/admin/users/login', usersigninController.loginUser);

router.get('/admin/users', authenticateToken, checkRoleUser(['admin' ]), usersigninController.fetchUsers);
router.get('/admin/users/:id', authenticateToken, checkRoleUser(['admin' ]), usersigninController.fetchUsersbyid);
router.put('/admin/users/:id', authenticateToken, checkRoleUser(['admin' , 'agent' ]), usersigninController.updateUser);
router.delete('/admin/users/:id', authenticateToken, checkRoleUser(['admin']), usersigninController.deleteUser);

// Only agents can update their details

// router.post('/users/signup',checkRole(['agent']) , usersigninController.createUser);
// router.post('/users/login', usersigninController.loginUser);

// router.put('/users/:id', authenticateToken, checkRole(['agent']), async (req, res, next) => {
//     if (req.user.id !== req.params.id) {
//         return res.status(403).json({ message: "Access denied." });
//     }
//     next();
// }, usersigninController.updateUser);

module.exports = router;
