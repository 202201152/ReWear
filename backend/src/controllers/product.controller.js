import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("uploader", "name email");
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const searchProducts = async (req, res) => {
  try {
    const {search} = req.body;
    const rawSearch = search.trim();
    if(!rawSearch){
      return res.status(400).json({message: "cannot search blank"});
    }
    const escapedSearch = rawSearch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedSearch, "i");
    const products = await Product.find({title: regex});
    if(!products) return res.status(400).json({message: "not products found."});
    return res.status(200).json(products);
  } catch (error) {
    console.log("error in searchproducts controller");
    return res.status(500).json({message: "Internal Server Error"});
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const {userId} = req.user;
    const {productId} = req.params;
    if(!productId) return res.status(400).json({message: "no productId found"});
    const product = await Product.findById(productId);
    
    if(userId !== product.sellerId) return res.status(403).json({message: "unauthorized"});
    await User.findByIdAndUpdate(userId, {$pull: {productsListed : productId}});
    await Product.findByIdAndDelete(productId);
    return res.status(200).json({message: "product removed from selling."});
  } catch (error) {
    console.log("error in deleteProduct controller");
    return res.status(500).json({message: "Internal Server error"});
  }
}

export const editProduct = async (req, res) => {
  try {
    const {userId} = req.user;
    const {productId} = req.params;
    const {productData} = req.body;
    if(!productId) return res.status(404).json({message: "no productId"});
    const product = await Product.findById(productId);
    
    if(userId !== product.sellerId) return res.status(403).json({message: "unauthorized"});
    const editedProduct = await Product.findByIdAndUpdate(productId, {...product, productData}, {new:true});
    return res.status(200).json(editedProduct);
  } catch (error) {
    console.log("error in deleteProduct controller");
    return res.status(500).json({message: "Internal Server error"});
  }
}


