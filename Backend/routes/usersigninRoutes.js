const express = require('express');
const router = express.Router();
const usersigninController = require('../controller/usersigninController');
const protecting =  require ('../authenticate/authentication');

router.post('/users/signup', usersigninController.createUser);
router.post('/users/login', usersigninController.loginUser);
//get all users
router.get('/users', usersigninController.fetchUsers);
//get a user id 
router.get('/users/:id', usersigninController.fetchUsersbyid);
//update a user id 
router.post('/users/:id', usersigninController.updateUser);
//delete a user id 
router.delete('/users/:id', usersigninController.deleteUser);
//login 

module.exports = router;

