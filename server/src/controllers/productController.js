const Product = require('../models/Product');

const getProducts = async(req, res) => {
    try{
        const products = await Product.find();
        res.json(products);
    }catch{
        res.status(500).json({message:error.message});
    }
};

const getProductsById = async(req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        if(product){
            res.json(product);
        }else{
            res.status(404).json({message: 'Product not found'});
        }
    }catch{
        res.status(500).json({message:error.message});
    }
};

module.exports = {getProducts, getProductsById};