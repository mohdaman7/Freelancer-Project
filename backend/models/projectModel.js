import mongoose from "mongoose";

const projectsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  budget: { type: Number, required: true },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  developerId: { type: mongoose.Schema.Types.ObjectId, ref: "Developer" },
  status: { type: String, default: "Open" }, // Open, In Progress, Completed
  createdAt: { type: Date, default: Date.now },
  deadline: { type: Date },
});

const Project = mongoose.model("Project", projectsSchema);
export default Project;
