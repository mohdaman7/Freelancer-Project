import express from "express";
import mongoose from "mongoose";
import { Server } from "socket.io";
import http from "http";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

// Routes
import adminRoute from "./routes/adminRoute.js";
import clientRoute from "./routes/clientRoute.js";
import developerRoute from "./routes/developerRoute.js";
import { jobRoutes } from "./routes/JobRoute.js";
import notificationRoute from "./routes/notificationRoute.js";

// Initialize environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

// Constants
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/FreelancerProject";
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// Initialize Express app and HTTP server
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
export const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Socket.IO connection handler
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Routes
app.use("/api/admin", adminRoute);
app.use("/api/client", clientRoute);
app.use("/api/developers", developerRoute);
app.use("/api/jobs", jobRoutes(io));
app.use("/api/notifications", notificationRoute);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
} else {
  // Handle 404 errors in development
  app.use((req, res) => {
    res.status(404).json({
      status: "error",
      message: "Endpoint not found",
      requestedPath: req.path,
    });
  });
}

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global error handler:", err);
  res.status(500).json({
    status: "error",
    message: "Internal server error",
    error: err.message,
  });
});

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("DB connected successfully"))
  .catch((error) => console.error("DB connection error:", error));

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});