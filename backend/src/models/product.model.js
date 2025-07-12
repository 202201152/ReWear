import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  productBrandName: {
    type: String,
  },
  productType: {
    type: String,
    required: true, // Fixed typo
  },
  description: {
    type: String,
    maxlength: 500,
  },
  requestedUserId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  ],
  productImage: {
    type: String,
    required: true, // Fixed typo
    default: "",
  },
  points: {
    type: Number,
    required: true, // Fixed typo
    default: 0,
  },
  swapRequest: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  ],
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending", // For admin moderation
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Product = mongoose.model("Product", ProductSchema); // Fixed model creation
export default Product;
