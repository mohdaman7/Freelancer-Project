import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, require: true },
  message: { type: String, require: true },
  status: { type: String, default: "Unread" },
  createdAt: { type: Date, default: Date.now },
});

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
