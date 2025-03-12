import mongoose from "mongoose";

const proposalSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  developerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  proposalText: {
    type: String,
    required: true,
  },
  proposedBudget: {
    type: Number,
    required: true,
  },
  proposedDeadline: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'accepted'],
    default: "pending",
  },
  paymentOrderId: {
    type: String, 
    default: null,
  },
  paymentId: {
    type: String, 
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Proposal = mongoose.model("Proposal", proposalSchema);

export default Proposal;