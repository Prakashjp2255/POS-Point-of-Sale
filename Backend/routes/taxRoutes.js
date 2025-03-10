const express = require ("express");
const router = express.Router();
const taxController = require ('../controller/taxController.js');
const { authorizeRoles , checkRoleUser } = require('../middleware/middleware');
const protect = require("../authenticate/authentication");


router.post('/tax', protect, authorizeRoles(['admin' , 'agent']), taxController.createTax); // Create a Tax record
router.get('/tax', protect, authorizeRoles(['admin' , 'agent']), taxController.getTax); // Get all Tax records
router.get('/tax/:id', protect, authorizeRoles(['admin' , 'agent']), taxController.getTaxbyId); // Get a specific Tax record by ID
router.put('/tax/:id', protect, authorizeRoles(['admin' , 'agent']), taxController.updateTaxes); // Update a Tax record
router.delete('/tax/:id', protect, authorizeRoles(['admin' , 'agent']), taxController.deletetax); // Delete a Tax record

module.exports = router ;