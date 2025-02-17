
const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "productModel",  // Many-to-many relationship with Product
        required: true
    }],
    quantity: {
        type: Number,
        required: true,
        min: 0 // Prevent negative stocka
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("inventoryItem", inventorySchema);

