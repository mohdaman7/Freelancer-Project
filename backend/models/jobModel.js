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
      rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
      },
      earnings: {
    total: { type: Number, default: 0 },
    available: { type: Number, default: 0 },
    pending: { type: Number, default: 0 }
  },
  transactions: [{
    date: { type: Date, default: Date.now },
    description: String,
    amount: Number,
    status: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' }
  }]

      
    },
    { timestamps: true }
);

const Job =  mongoose.model("Job",jobSchema);
export default Job