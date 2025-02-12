const mongoose = require('mongoose');

const productshow = new mongoose.Schema ( {
    name: {
        type : string ,
        required : true
    },
    price: {
        type : string ,
        required : true
    },
    description: {
        type : string ,
        required : true
    },
    category: {
        type : string ,
        required : true
    },
})

module.exports = mongoose.model ("product" , productshow);