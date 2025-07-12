import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    productBrandName:{
        type: String,
    },
    productType: {
        type: String,
        req: true,
    },
    description: {
        type: String,
        maxlength: 500,
    },
    requestedUserId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    productImage: {
        type: String,
        req: true,
        default: "",
    },
    points: {
        type: Number,
        req: true,
        default: 0,
    },
    swapRequest: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
})

const Product = mongoose.model(ProductSchema);
export default Product;