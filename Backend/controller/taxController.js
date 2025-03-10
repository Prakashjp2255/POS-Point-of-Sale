const taxModel = require( "../model/taxModel");
const mongoose = require("mongoose");

// add a tax  

exports.createTax =async(req,res) =>{
    try{

        const tax = new taxModel (req.body);
        const savedTax = await tax.save();
        res.status(200).json(savedTax);

    }catch  (error) {
        res.status(400).json({error : "INTERNAL SERVER ERROR "} )
    }
}

exports.getTax = async(req,res) => {
    try {
        
        const taxes = await taxModel.find();
        console.log(taxes);
        res.status (200).json (taxes) ;

    }catch(error){
        res.status(400).json({error: "INTERNAL SERVER ERROR"})
    }
}

exports.getTaxbyId = async (req ,res ) =>{
    try{

        const taxById = await taxModel.findById(req.params.id);
        
        if (!taxById) {
            return res.status (404).json ({message : "Tax not found"})
        }
    
        res.status(200).json(taxById)


    }catch (error) {
        res.status(400).json({error: "INTERNAL SERVER ERROR"})
    }
}

exports.updateTaxes = async (req ,res) => {
    try {
        
        const taxUpdate = await taxModel.findByIdAndUpdate(req.params.id , req.body , {new:true}) ;
        console.log("taxupdate ")
        if (!taxUpdate) {
            return res.status (404).json({message : "tax not found"})
        }
        res.status (200).json(taxUpdate)

    }catch (error) {
        res.status (400).json ({message : "INTERNAL SERVER ERROR"})
    }
}

exports.deletetax = async (req,res) => {
    try {
        const taxdel = await taxModel.findByIdAndDelete (req.params.id);
        if (!taxdel) {
            res.status(404).json({message : "Tax not found "})
        }
        res.status(200).json(taxdel)

        console.log(taxdel)
    }catch (error) {
        res.status (400).json({error : "INTERNAL SERVER ERROR" } )
    }
}


