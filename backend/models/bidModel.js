
const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  developerId: { type: mongoose.Schema.Types.ObjectId, ref: "Developer", required: true },
  amount: { type: Number, required: true },
  proposal: { type: String, required: true },
  status: { type: String, default: "Pending" }, // Pending, Accepted, Rejected
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Bid", bidSchema);