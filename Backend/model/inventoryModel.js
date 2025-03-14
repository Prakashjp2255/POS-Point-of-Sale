const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, // Reference to Product model
    quantity: Number,
    lastUpdated: { type: Date, default: Date.now },
    expirydate: {
        type : Date ,
        required : true
     },
  
});

module.exports = mongoose.model("Inventory", inventorySchema);
