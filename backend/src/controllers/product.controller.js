import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";

// Create product (image upload + pending status)
export const createProduct = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productImage, ...rest } = req.body;

    if (!productImage || !productImage.startsWith("data:")) {
      return res.status(400).json({ message: "Invalid or missing product image" });
    }

    const uploadResult = await cloudinary.uploader.upload(productImage);
    const product = new Product({
      ...rest,
      productImage: uploadResult.secure_url,
      sellerId: userId,
      status: "pending",
    });

    await product.save();
    await User.findByIdAndUpdate(userId, { $push: { productsListed: product._id } });

    res.status(201).json(product);
  } catch (err) {
    console.error("Error in createProduct:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Get all products (admin sees all, users see only approved)
export const getAllProducts = async (req, res) => {
  try {
    const filter = req.user.role === "admin" ? {} : { status: "approved" };
    const products = await Product.find(filter).populate("sellerId", "name email");
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Search products
export const searchProducts = async (req, res) => {
  try {
    const { search } = req.body;
    const rawSearch = search.trim();

    if (!rawSearch) return res.status(400).json({ message: "Search term cannot be blank" });

    const regex = new RegExp(rawSearch.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    const statusFilter = req.user.role === "admin" ? {} : { status: "approved" };

    const products = await Product.find({
      ...statusFilter,
      $or: [
        { productBrandName: regex },
        { productType: regex },
        { description: regex },
      ],
    });

    if (!products.length) return res.status(404).json({ message: "No products found." });
    return res.status(200).json(products);
  } catch (error) {
    console.error("Error in searchProducts:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete product (only seller or admin)
export const deleteProduct = async (req, res) => {
  try {
    const { userId, role } = req.user;
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (userId !== product.sellerId.toString() && role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Product.findByIdAndDelete(productId);
    await User.findByIdAndUpdate(product.sellerId, { $pull: { productsListed: productId } });

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error in deleteProduct:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Edit product (image update + reset to pending)
export const editProduct = async (req, res) => {
  try {
    const { userId, role } = req.user;
    const { productId } = req.params;
    const { productData } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (userId !== product.sellerId.toString() && role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    let updatedImageUrl = product.productImage;

    if (productData.productImage && productData.productImage.startsWith("data:")) {
      const uploadResult = await cloudinary.uploader.upload(productData.productImage);
      updatedImageUrl = uploadResult.secure_url;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        ...productData,
        productImage: updatedImageUrl,
        status: "pending",
      },
      { new: true }
    );

    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error in editProduct:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
