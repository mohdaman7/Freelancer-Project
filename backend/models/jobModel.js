import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      skillsRequired: {
        type: [String],
        required: true,
      },
      budget: {
        type: Number,
        required: true,
      },
      deadline: {
        type: Date,
        required: true,
      },
      clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
        required: true,
      },
      proposals: [
        {
          developerId: { type: mongoose.Schema.Types.ObjectId, ref: "Developer" },
          proposalText: { type: String, required: true },
          proposedBudget: { type: Number, required: true },
          proposedDeadline: { type: Date, required: true },
          status: {
            type: String,
            enum: ["Pending", "Accepted", "Rejected"],
            default: "Pending",
          },
        },
      ],
      status: {
        type: String,
        enum: ["Open", "In Progress", "Completed", "Closed"],
        default: "Open",
      },
    },
    { timestamps: true }
);

export default mongoose.model("Job",jobSchema);