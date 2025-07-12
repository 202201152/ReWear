import User from "../models/user.model.js";
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
        const {profilePic} = req.body;
        const email = req.user.email;
        if(!profilePic){
            return res.status(500).json({message: "profile pic is not uploaded"});
        }
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        console.log("cloudinary response: ", uploadResponse);

        const user = await User.findOneAndUpdate({email}, 
            { profilePic: uploadResponse.secure_url},
            { new: true },
        )
        console.log("User updated successfully");
        return res.status(200).json({message: "Profile Picture Updated Successfully"});

    } catch (error) {
        console.log("error in updateProfile controller: ", error.message);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

export const getSwaprequest = async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await User.findById(userId)
      .populate("productsListed")
      .populate("swapRequest");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error in swaprequest user controller:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getProductsRequested = async (req, res) => {
  try {
    const {userId} = req.user;
    const user = await User.findById(userId).populate("productsRequested");
    if(!user) return res.status(404).json({message: "user not found"});
    return res.status(200).json(user);

  } catch (error) {
    console.log("error in getProductsrequested usre controller");
    return res.status(500).json({message: "Internal Server Error"});
  }
}