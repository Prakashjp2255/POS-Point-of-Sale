const mongoose = require('mongoose');

const productshow = new mongoose.Schema ( {
    name: {
        type : String ,
        required : true
    },
    price: {
        type : String ,
        required : true
    },
    description: {
        type : String ,
        required : true
    },
    category: {
        type : String ,
        required : true
    },
    // quantity ithula vakalama ?
    inventories: [{ type: mongoose.Schema.Types.ObjectId, ref: "inventoryModel" }]

})

module.exports = mongoose.model ("product" , productshow);