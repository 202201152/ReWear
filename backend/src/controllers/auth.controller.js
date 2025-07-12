import bcrypt from "bcryptjs"
import User from "../models/user.model.js"
import { generateToken } from "../lib/utils.js"

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(400).json({message: "fill the required fields."});
        }
        const user = await User.findOne({email});
        if(!user) 
    } catch (error) {
        
    }
}
export const signup = async (req, res) => {
    try {
        const {email, password, userName} = req.body;
        if(!userName || !email || !password) return res.status(400).json({message: "All fields are required"});
        if(password.length < 6) return res.status(400).json({message: "atleast 6 characters are required in password."});
        const user = await User.findOne({email});
        if(user) res.status(400).json({message: "user already exists. Please try logging in"});
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            userName: username,
            email,
            password: hashedPassword
        })
        if(newUser){
            generateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                userName: newUser.userName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            })
        }
        console.log("user created successfully");
    } catch (error) {
        console.log("error in signup, auth controller");
        return res.status(500).json({message: "Internal Server Error"});
    }
}
export const logout = (req, res) => {

}
export const checkAuth = (req, res) => {

}