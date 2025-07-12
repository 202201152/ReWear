import User from "../models/user.model.js";
import Swap from "../models/swap.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updatePoints = async (req, res) => {
  try {
    const { amount } = req.body;

    if (typeof amount !== "number") {
      return res.status(400).json({ message: "Invalid amount" });
    }

    // Only admin can update points directly
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can update points directly" });
    }

    const user = await User.findById(req.user.id);
    user.points += amount;
    await user.save();

    res.json({ points: user.points });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const email = req.user.email;

    if (!profilePic || typeof profilePic !== "string" || !profilePic.startsWith("data:")) {
      return res.status(400).json({ message: "Invalid or missing profile picture" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    console.log("Cloudinary response:", uploadResponse);

    const user = await User.findOneAndUpdate(
      { email },
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    console.log("User updated successfully");
    return res.status(200).json({ message: "Profile picture updated successfully", profilePic: user.profilePic });
  } catch (error) {
    console.log("Error in updateProfile controller:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getSwaprequest = async (req, res) => {
  try {
    const { userId } = req.user;

    const swaps = await Swap.find({ receiver: userId })
      .populate("item")
      .populate("requester", "name email");

    return res.status(200).json(swaps);
  } catch (error) {
    console.error("Error in getSwaprequest controller:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getProductsRequested = async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await User.findById(userId).populate("productsRequested");
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json(user.productsRequested);
  } catch (error) {
    console.log("Error in getProductsRequested controller:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
