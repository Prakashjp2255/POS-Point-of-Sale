const express = require('express');
const router = express.Router();
const usersigninController = require('../controller/usersigninController');
const protecting =  require ('../authenticate/authentication');

router.post('/users/signup', usersigninController.createUser);
//get all users
router.get('/users', usersigninController.fetchUsers);
//get a user id 
router.get('/users/:id', usersigninController.fetchUsersbyid);
//update a user id 
router.put('/users/:id', usersigninController.updateUser);
//delete a user id 
router.delete('/users/:id', usersigninController.deleteUser);
//login 
router.post('/users/login', usersigninController.loginUser);
module.exports = router;

