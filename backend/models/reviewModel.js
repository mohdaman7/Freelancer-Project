import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  developerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Developer",
    required: true,
  },
  rating: { type: Number, required: true }, // Out of 5
  comment: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Review = mongoose.model("Review", reviewSchema)
export default Review
