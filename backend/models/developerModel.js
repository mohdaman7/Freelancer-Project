import mongoose from "mongoose";

const developerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true 
  },
  password: { type: String, required: true },
  profilePhoto: { type: String, default: "" },
  bio: { type: String, maxlength: 500 },
  
  title: { type: String, required: true },
  skills: [{ 
    name: { type: String, required: true },
    experience: { type: String, enum: ["Beginner", "Intermediate", "Expert"] }
  }],
  programmingLanguages: [{ type: String }],
  hourlyRate: { type: Number, required: true },
  availability: { 
    type: String, 
    enum: ["Available", "Not Available", "Part-time"], 
    default: "Available" 
  },
  experienceLevel: { 
    type: String, 
    enum: ["Entry", "Mid", "Senior"], 
    required: true 
  },

  portfolioUrl: { type: String },
  githubUrl: { type: String },
  linkedinUrl: { type: String },

  country: { type: String },

  balance: { type: Number, default: 0 },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  status: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const Developer = mongoose.model("Developer", developerSchema);
export default Developer;