import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    userName: {
        type: String, 
        req: true,
    },
    email: {
        type: String,
        req: true,
        unique: true,
    },
    password: {
        type: String,
        req: true,
        minlength: 6,
    },
    profilePic: {
        type: String,
        default: "",

    },
    points: {
        type: Number,
        default: 0,
    },
    productsListed: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    }],
    productsRequested: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    }]
}, {timestamps: true})

const User = mongoose.model(UserSchema);
export default User;