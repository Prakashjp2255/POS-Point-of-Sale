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


})

module.exports = mongoose.model ("Product" , productshow);