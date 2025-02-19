const inventoryModel = require("../model/inventoryModel.js");
const productModel = require("../model/productModel.js");
const mongoose = require('mongoose');


// for some my purose ill check the post 
exports.createItem = async (req ,res) => {
    try{
        const inventory = new inventoryModel(req.body);
        const savedInventory = await inventory.save();
        await productModel.findByIdAndUpdate(req.body.product,{
            $push: { inventories: savedInventory._id } 
        });

        const populatedInventory = await inventoryModel.findById(savedInventory._id).populate("product");
        return res.status(201).json(populatedInventory);

    }catch (error){
        res.status(400).json({error})
    }
}

// Create a new inventory item


// exports.createItem = async (req, res) => {
//     try {
//         const inventory = new inventoryModel(req.body);
//         const savedInventory = await inventory.save();

//         // Add the inventory to the product's inventories array
        // await productModel.findByIdAndUpdate(req.body.product, { 
        //     $push: { inventories: savedInventory._id } 
        // });

//         // Fetch inventory again with populated product details
//         const populatedInventory = await inventoryModel.findById(savedInventory._id).populate("product");

//         return res.status(201).json(populatedInventory);
//     } catch (error) {
//         console.error("Error creating inventory item:", error);
//         res.status(500).json({ error: "INTERNAL SERVER ERROR" });
//     }
// };


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
// exports.getItemById = async (req, res) => {
//     try {
//         const inventory = await inventoryModel.findById(req.params.id).populate('product');
//         if (!inventory) {
//             return res.status(404).json({ error: 'Inventory item not found' });
//         }
//         res.status(200).json(inventory);
//     } catch (error) {
//         console.error("Error getting item:", error);
//         res.status(500).json({ error: "INTERNAL SERVER ERROR" });
//     }
// };


// Get an inventory by ID with product details
exports.getItemById = async (req, res) => {
    try {
        const inventory = await inventoryModel.findById(req.params.id)
            .populate({
                path: 'product',
                select: '_id name price' // Select specific fields to populate
            });
        if (!inventory) {
            return res.status(404).json({ error: 'Inventory item not' });
        }
        const result = {
            _id: inventory._id,
            products: [inventory.product],
            quantity: inventory.quantity,
            lastUpdated: inventory.updatedAt // Assuming you have timestamps enabled in your schema
        };
        res.status(200).json(result);
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
