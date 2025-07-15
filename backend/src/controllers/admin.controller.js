import Product from "../models/Product.js";
import User from "../models/User.js";
export const getPendingProducts = async (req, res) => {
  try {
    const products = await Product.find({ status: "pending" })
      .populate("listedBy", "name email");
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching pending products:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const approveProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findByIdAndUpdate(
      productId,
      { status: "approved" },
      { new: true }
    );

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product approved", product });
  } catch (error) {
    console.error("Error approving product:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const rejectProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findByIdAndUpdate(
      productId,
      { status: "rejected" },
      { new: true }
    );

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product rejected", product });
  } catch (error) {
    console.error("Error rejecting product:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findByIdAndDelete(productId);

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAdminStats = async (req, res) => {
  try {
    const [users, products, pending, swaps] = await Promise.all([
      User.countDocuments(),
      Product.countDocuments(),
      Product.countDocuments({ status: "pending" }),
      // Add Swap.countDocuments() if you want to include swaps
    ]);

    res.status(200).json({
      totalUsers: users,
      totalProducts: products,
      pendingProducts: pending,
      // totalSwaps: swaps
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
