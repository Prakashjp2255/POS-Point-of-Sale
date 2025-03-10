const express = require("express");
const router = express.Router();
const userproductController = require("../controller/userproductController");  // Ensure correct import
const protect = require("../authenticate/authentication"); // Ensure middleware is correct

const { authorizeRoles, checkRole, checkRoleUser } = require('../middleware/middleware');
// Route definitions
router.post("/product", protect, authorizeRoles(['admin', 'agent']) ,userproductController.createProduct);

router.get("/products" , protect,authorizeRoles(['admin', 'agent']) , userproductController.getProduct);
router.get("/product/:id" , protect, authorizeRoles(['admin', 'agent']) , userproductController.getProductById);
router.put("/product/:id/update" , protect, authorizeRoles(['admin', 'agent']) , userproductController.updateProduct);
router.delete("/product/:id/delete" , protect, authorizeRoles(['admin', 'agent']) , userproductController.deleteProduct);

module.exports = router;

// Debugging Logs
console.log("Protect Middleware:", typeof protect); // Should be a function
console.log("User Product Controller:", Object.keys(userproductController)); // Should list function names




// router.post('/product', authenticateToken, checkRoleUser(['admin', 'agent']), createProduct);
// router.get('/products', authenticateToken,protect.getProduct);
// router.get('/product/:id', authenticateToken, checkRoleUser(['admin', 'agent']), getProductById);
// router.put('/product/:id/update', authenticateToken, checkRoleUser(['admin', 'agent']), updateProduct);
// router.delete('/product/:id/delete', authenticateToken, checkRoleUser(['admin', 'agent']), deleteProduct);
