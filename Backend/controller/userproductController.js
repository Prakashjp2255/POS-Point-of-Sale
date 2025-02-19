const productModel = require("../model/productModel");
const mongoose = require('mongoose');
const inventoryModel = require("../model/inventoryModel.js");
// Add a new product
exports.createProduct = async (req, res) => {
    try {
        const product = new productModel(req.body);
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);

    } catch (error) {
        console.log("Error creating product:", error);
        return res.status(400).json({ error: error });
    }
};

// Get all products
exports.getProduct = async (req, res) => {
    try {
        const products = await productModel.find();
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error });
    }
};

// Get a product by ID
// Get a product by ID with inventory details
exports.getProductById = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);
        console.log("Fetching product with ID:", req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ error });
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    try {
        const product = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const product = await productModel.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }
        res.status(200).json({ message: "Successfully deleted product." });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error});
        res.send(400).console.log
    }
};

