const productModel = require ( "../model/productModel");

// add a new product that means create 

exports.createProduct = async(req , res ) => {
    try {
        const product =new productModel(req.body);
        const savedProduct = await product.save();
        res.status (201).json(savedProduct);

    }catch (error) {
        console.log("error creating product:" ,error)
        return res.status (400).json ({error : "INTERNAL SERVER ERROR "})
    }
}


exports.getProduct = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
};


exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
};


exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }
        res.status(200).json({ message: "Successfully deleted product." });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
};
