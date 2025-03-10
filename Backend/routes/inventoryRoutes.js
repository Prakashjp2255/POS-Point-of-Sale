const express = require('express');
const router = express.Router();
const inventoryController = require('../controller/inventoryController'); // Correct path
const { authorizeRoles, checkRole, checkRoleUser } = require('../middleware/middleware');
const protect = require("../authenticate/authentication");

router.post('/inventory',protect, authorizeRoles(['admin', 'agent']) , inventoryController.createItem);
router.get('/inventorys',protect, authorizeRoles(['admin', 'agent']), inventoryController.getItems);
router.get('/inventory/:id',protect, authorizeRoles(['admin', 'agent']), inventoryController.getItemById);
router.put('/inventory/:id/update', protect, authorizeRoles(['admin', 'agent']),inventoryController.updateItem);
router.delete('/inventory/:id/delete',protect, authorizeRoles(['admin', 'agent']), inventoryController.deleteItem);

module.exports = router;
