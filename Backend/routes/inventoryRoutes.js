const express = require('express');
const router = express.Router();
const inventoryController = require('../controller/inventoryController'); // Correct path

router.post('/inventory', inventoryController.createItem);
router.get('/inventorys', inventoryController.getItems);
router.get('/inventory/:id', inventoryController.getItemById);
router.put('/inventory/:id/update', inventoryController.updateItem);
router.delete('/inventory/:id/delete', inventoryController.deleteItem);

module.exports = router;
