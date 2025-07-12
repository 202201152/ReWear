const Product = require("../models/product.model");

exports.createProduct = async (req, res) => {
  try {
    const image = req.file ? req.file.filename : null;
    const product = new Product({ ...req.body, image, uploader: req.user.id });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).populate("uploader", "name email");
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
