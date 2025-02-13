const express = require('express');
const router = express.Router();
const usersigninController = require('../controller/usersigninController');
const protecting =  require ('../authenticate/authentication');

router.post('/users/signup', usersigninController.createUser);
router.get('/users', usersigninController.fetchUsers);
router.put('/users/:id', usersigninController.updateUser);
router.delete('/users/:id', usersigninController.deleteUser);
router.post('/users/login', usersigninController.loginUser);
module.exports = router;

