const inventoryModel = require("../model/inventoryModel.js");
const productModel = require("../model/productModel.js");
const mongoose = require('mongoose');

// Create a new inventory item
exports.createItem = async (req, res) => {
    try {
        const inventory = new inventoryModel(req.body);
        const savedInventory = await inventory.save();
        
        // Add the inventory to the product's inventories array
        await productModel.findByIdAndUpdate(req.body.product, { $push: { inventories: savedInventory._id } });
        
        res.status(201).json(savedInventory);
    } catch (error) {
        console.error("Error creating inventory item:", error);
        res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
};

// Get all items
exports.getItems = async (req, res) => {
    try {
        const inventory = await inventoryModel.find();
        res.status(200).json(inventory);
    } catch (error) {
        console.error("Error getting items:", error);
        res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
};

// Get an inventory by ID with product details
exports.getItemById = async (req, res) => {
    try {
        const inventory = await inventoryModel.findById(req.params.id).populate('product');
        if (!inventory) {
            return res.status(404).json({ error: 'Inventory item not found' });
        }
        res.status(200).json(inventory);
    } catch (error) {
        console.error("Error getting item:", error);
        res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
};

// Update an item
exports.updateItem = async (req, res) => {
    try {
        const updatedInventory = await inventoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedInventory) {
            return res.status(404).json({ error: 'Inventory item not found' });
        }
        res.status(200).json(updatedInventory);
    } catch (error) {
        console.error("Error updating item:", error);
        res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
};

// Delete an item
exports.deleteItem = async (req, res) => {
    try {
        const inventory = await inventoryModel.findByIdAndDelete(req.params.id);
        if (!inventory) {
            return res.status(404).json({ error: 'Inventory item not found' });
        }
        res.status(200).json({ message: "Successfully deleted item" });
    } catch (error) {
        console.error("Error deleting item:", error);
        res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
};
