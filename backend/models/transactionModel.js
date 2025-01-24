
import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
  developerId: { type: mongoose.Schema.Types.ObjectId, ref: "Developer", required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: "Pending" }, // Completed, Pending, Failed
  createdAt: { type: Date, default: Date.now },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction