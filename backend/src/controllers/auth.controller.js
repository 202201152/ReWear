import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateToken } from "../lib/utils.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Fill all required fields." });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "User not found. Try signing up." });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(403).json({ message: "Wrong email or password." });

    generateToken(user._id, res);

    return res.status(201).json({
      userName: user.userName,
      email: user.email,
      _id: user._id,
      role: user.role,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("error in login auth controller");
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const signup = async (req, res) => {
  try {
    const { email, password, userName } = req.body;

    if (!userName || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    if (password.length < 6)
      return res.status(400).json({ message: "Password must be at least 6 characters." });

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists. Try logging in." });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
      role: "user",
    });

    await newUser.save();
    generateToken(newUser._id, res);

    res.status(201).json({
      _id: newUser._id,
      userName: newUser.userName,
      email: newUser.email,
      role: newUser.role,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.log("error in signup controller");
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("jwt", { httpOnly: true });
    return res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    console.log("error in logout auth controller");
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const checkAuth = (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    console.log("error in checkAuth controller");
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
