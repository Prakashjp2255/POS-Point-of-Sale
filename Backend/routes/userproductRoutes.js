const express = require('express');
const router = express.Router();
const { createProduct, 
    getProduct, 
    getProductById, 
    updateProduct, 
    deleteProduct } = require('../controller/userproductController.js');
const { protect } = require('../authenticate/authentication');



router.post('/product',protect, createProduct);
router.get('/products', protect, getProduct);
router.get('/product/:id', protect, getProductById);
router.put('/product/:id/update', protect, updateProduct);
router.delete('/product/:id/delete', protect, deleteProduct);

module.exports = router;
