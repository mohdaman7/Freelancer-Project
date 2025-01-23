
const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, require: true},
    message: {type: String, require: true},
    status: {type: String, default: "Unread"},
    createdAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model("Notification",notificationSchema)