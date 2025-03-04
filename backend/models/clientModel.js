import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  company: { 
    type: String 
  },
  role: {
    type: String,
    enum: ["client"],
    default: "client", 
    required: true,
  },
  projects: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Project" 
  }],
  balance: { 
    type: Number, 
    default: 0,
    min: 0 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Check if the model already exists before creating it
const Client = mongoose.models.Client || mongoose.model("Client", clientSchema);

export default Client;