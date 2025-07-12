import Product from "../models/product.model.js";
import User from "../models/user.model.js";

// Create a new product (always marked as "pending" for admin approval)
export const createProduct = async (req, res) => {
  try {
    const userId = req.user.userId;

    const product = new Product({
      ...req.body,
      sellerId: userId,
      status: "pending" // Force moderation
    });

    await product.save();

    // Optionally link product to user’s list
    await User.findByIdAndUpdate(userId, { $push: { productsListed: product._id } });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all APPROVED products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ status: "approved" }).populate("sellerId", "name email");
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Search approved products by brand/type/description
export const searchProducts = async (req, res) => {
  try {
    const { search } = req.body;
    const rawSearch = search.trim();

    if (!rawSearch) {
      return res.status(400).json({ message: "Search term cannot be blank" });
    }

    const regex = new RegExp(rawSearch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "i");

    const products = await Product.find({
      status: "approved",
      $or: [
        { productBrandName: regex },
        { productType: regex },
        { description: regex }
      ]
    });

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found." });
    }

    return res.status(200).json(products);
  } catch (error) {
    console.error("Error in searchProducts controller:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete product (only by the seller)
export const deleteProduct = async (req, res) => {
  try {
    const { userId } = req.user;
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (userId !== product.sellerId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Product.findByIdAndDelete(productId);
    await User.findByIdAndUpdate(userId, { $pull: { productsListed: productId } });

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error in deleteProduct:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Edit product (auto sets back to pending)
export const editProduct = async (req, res) => {
  try {
    const { userId } = req.user;
    const { productId } = req.params;
    const { productData } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (userId !== product.sellerId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        ...productData,
        status: "pending" // re-moderate after edit
      },
      { new: true }
    );

    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error in editProduct:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
