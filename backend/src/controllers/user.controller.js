const User = require("../models/user.model");

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePoints = async (req, res) => {
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
