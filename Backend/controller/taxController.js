const taxModel = require("../model/taxModel");
const mongoose = require("mongoose");

// Add a new tax
exports.createTax = async (req, res) => {
  try {
    const tax = new taxModel(req.body);
    const savedTax = await tax.save();
    res.status(201).json(savedTax); // Use 201 for resource creation
  } catch (error) {
    console.error("Error creating tax:", error);
    res.status(500).json({ error: error.message || "INTERNAL SERVER ERROR" });
  }
};

// Get all taxes
exports.getTax = async (req, res) => {
  try {
    const taxes = await taxModel.find();
    res.status(200).json(taxes);
  } catch (error) {
    console.error("Error fetching taxes:", error);
    res.status(500).json({ error: error.message || "INTERNAL SERVER ERROR" });
  }
};

// Get tax by ID
exports.getTaxbyId = async (req, res) => {
  try {
    const taxById = await taxModel.findById(req.params.id);

    if (!taxById) {
      return res.status(404).json({ message: "Tax not found" });
    }

    res.status(200).json(taxById);
  } catch (error) {
    console.error("Error fetching tax by ID:", error);
    res.status(500).json({ error: error.message || "INTERNAL SERVER ERROR" });
  }
};

// Update tax
exports.updateTaxes = async (req, res) => {
  try {
    const taxUpdate = await taxModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!taxUpdate) {
      return res.status(404).json({ message: "Tax not found" });
    }

    res.status(200).json(taxUpdate);
  } catch (error) {
    console.error("Error updating tax:", error);
    res.status(500).json({ error: error.message || "INTERNAL SERVER ERROR" });
  }
};

// Delete a tax
exports.deletetax = async (req, res) => {
  try {
    const taxdel = await taxModel.findByIdAndDelete(req.params.id);

    if (!taxdel) {
      return res.status(404).json({ message: "Tax not found" });
    }

    res.status(200).json({ message: "Successfully deleted tax", taxdel });
  } catch (error) {
    console.error("Error deleting tax:", error);
    res.status(500).json({ error: error.message || "INTERNAL SERVER ERROR" });
  }
};
