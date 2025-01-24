import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
    developerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Developer',
        required: true,
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true,
    },
    feedbackText: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
},
{timestamps: true}
)

const Feedback =  mongoose.model("Feedback",feedbackSchema);
export default Feedback