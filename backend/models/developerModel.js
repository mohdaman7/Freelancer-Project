import mongoose from "mongoose";

const developerSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    title: { type: String, required: true },
    hourlyRate: { type: Number, required: true },
    country: { type: String, required: true },
    skills: [
      {
        name: { type: String, required: true },
        experience: { type: String, enum: ["Beginner", "Intermediate", "Expert"], required: true },
      },
    ],
    experienceLevel: { type: String, required: true },
    portfolioUrl: { type: String },
    githubUrl: { type: String },
    linkedinUrl: { type: String },
  },
  { timestamps: true }
);

const Developer = mongoose.model("Developer", developerSchema);
export default Developer;