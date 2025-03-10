const mongoose  = require ("mongoose") ;

const taxSchema = new mongoose.Schema({
    SKU : {
        type :Number ,
        required : true 
    },

    SGST : {
        type :Number ,
        required : true
    },

    CGST : {
        type :Number,
        required :true
    },

    product : {
        type : mongoose.Schema.Types.ObjectId , ref : "Product" , 
        required : true 
        
    }
});

module.exports = mongoose.model('Tax',taxSchema);