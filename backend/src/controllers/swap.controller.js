import Swap from "../models/swap.model.js";
import Product from "../models/product.model.js";

export const createSwapRequest = async (req, res) => {
  try {
    const { item, receiver, method, pointsUsed } = req.body;
    const requester = req.user.userId;

    const product = await Product.findById(item);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.status !== "approved") {
      return res.status(400).json({ message: "Cannot request swap on unapproved product." });
    }

    const swap = new Swap({
      item,
      requester,
      receiver,
      method,
      pointsUsed: method === "points" ? pointsUsed : 0,
    });

    await swap.save();
    return res.status(201).json(swap);
  } catch (error) {
    console.error("Error creating swap request:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const approveSwapRequest = async (req, res) => {
  try {
    const { swapId } = req.params;
    const userId = req.user.userId;

    const swap = await Swap.findById(swapId);
    if (!swap) return res.status(404).json({ message: "Swap not found" });

    if (swap.receiver.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    swap.status = "accepted";
    swap.respondedAt = new Date();
    await swap.save();

    return res.status(200).json({ message: "Swap approved", swap });
  } catch (error) {
    console.error("Error approving swap request:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserSwaps = async (req, res) => {
  try {
    const userId = req.user.userId;

    const swaps = await Swap.find({
      $or: [{ requester: userId }, { receiver: userId }],
    })
      .populate("item")
      .populate("requester", "name email")
      .populate("receiver", "name email");

    return res.status(200).json(swaps);
  } catch (error) {
    console.error("Error fetching user swaps:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
