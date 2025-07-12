import mongoose from "mongoose";
const swapSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  method: {
    type: String,
    enum: ["swap", "points"],
    required: true,
  },
  pointsUsed: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected", "completed", "cancelled"],
    default: "pending",
  },
  requestedAt: {
    type: Date,
    default: Date.now,
  },
  respondedAt: Date,
});

const Swap = mongoose.model("Swap", swapSchema);
export default Swap;
