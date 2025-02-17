import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  name: { type: String, require: true },

  email: { type: String, require: true, unique: true },

  password: { type: String, require: true },

  company: { type: String },

  role: {
    type: String,
    enum: ["client"],
    default: "client", 
    required: true,
  },

  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],

  balance: { type: Number, default: 0 },

  createAt: { type: Date, default: Date.now },

  balance: {
    type: Number,
    default: 0,
    min: 0
  }
});

const Client = mongoose.model("Client", clientSchema);
export default Client;
