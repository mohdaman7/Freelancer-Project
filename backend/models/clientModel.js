import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({

  name: { type: String, require: true },

  email: { type: String, require: true, unique: true },

  password: { type: String, require: true },

  company: { type: String },

  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],

  balance: { type: Number, default: 0 },

  createAt: { type: Date, default: Date.now },

});

const Client = mongoose.model("Client", clientSchema);
export default Client
