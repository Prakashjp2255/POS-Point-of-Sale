const mongoose = require('mongoose');

const Productshow = new mongoose.Schema ( {
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
    tax : {
        type : mongoose.Schema.Types.ObjectId , ref: "Tax", 
        required : true 
    }
    


})

module.exports = mongoose.model ("Product" , Productshow);