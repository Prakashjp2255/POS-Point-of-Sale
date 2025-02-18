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
    expirydate: {
       type : Date ,
       required : true
    },
    quantity:{
        type : Number ,
        required : true
    },

    // quantity ithula vakalama ?
    inventories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Inventory" }]

})

module.exports = mongoose.model ("Product" , productshow);