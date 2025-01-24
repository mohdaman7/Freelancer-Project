
import mongoose from "mongoose";

const developerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    skills: [{ type: String }],
    bio: { type: String },
    portfolio: { type: String },
    rating: { type: Number, default: 0 },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    balance: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    status: { type: Boolean, default: true },
})

const Developer = mongoose.model("Developer",developerSchema)
export default Developer