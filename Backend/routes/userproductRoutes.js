const express = require('express');
const router = express.Router();
const { createProduct, 
    getProduct, 
    getProductById, 
    updateProduct, 
    deleteProduct } = require('../controller/userproductController.js');
const { protect } = require('../authenticate/authentication');



router.post('/product',protect, createProduct);
router.get('/product', protect, getProduct);
router.get('/getproductbyid/:id', protect, getProductById);
router.put('/updateproduct/:id', protect, updateProduct);
router.delete('/deleteproduct/:id', protect, deleteProduct);

module.exports = router;
