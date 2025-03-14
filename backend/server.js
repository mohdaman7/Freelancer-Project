import express from "express";
import mongoose from "mongoose";
import { Server } from "socket.io";
import http from "http";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import adminRoute from "./routes/adminRoute.js";
import clientRoute from "./routes/clientRoute.js";
import developerRoute from "./routes/developerRoute.js";
import { jobRoutes } from "./routes/JobRoute.js";
import notificationRoute from "./routes/notificationRoute.js";
import chatRoute from "./routes/chatRoute.js"; 
import jwt from "jsonwebtoken";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();


const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/FreelancerProject";
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";


const app = express();
const server = http.createServer(app);


export const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"], 
    credentials: true 
  },
  transports: ['websocket', 'polling'] 
});


io.engine.on("connection_error", (err) => {
  console.error("Socket.IO connection error:", err);
});


io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) return next(new Error("Authentication error"));
  
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return next(new Error("Authentication error"));
    socket.user = {
      id: decoded.id,
      role: decoded.role
    };
    next();
  });
});


io.on("connection", (socket) => {
  console.log(`User connected: ${socket.user.id} (${socket.user.role})`);

  socket.on("join-chat", (proposalId) => {
    socket.join(proposalId);
    console.log(`User ${socket.user.id} joined chat ${proposalId}`);
  });

  socket.on("send-message", ({ proposalId, message }) => {
    io.to(proposalId).emit("message", {
      ...message,
      senderId: socket.user.id,
      timestamp: new Date()
    });
  });

  socket.on("typing", (proposalId) => {
    socket.to(proposalId).emit("typing", socket.user.id);
  });

  socket.on("stop-typing", (proposalId) => {
    socket.to(proposalId).emit("stop-typing", socket.user.id);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.user.id}`);
  });
});


app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/admin", adminRoute);
app.use("/api/client", clientRoute);
app.use("/api/developers", developerRoute);
app.use("/api/jobs", jobRoutes(io));
app.use("/api/notifications", notificationRoute);
app.use("/api/chat", chatRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
} else {
 
  app.use((req, res) => {
    res.status(404).json({
      status: "error",
      message: "Endpoint not found",
      requestedPath: req.path,
    });
  });
}


app.use((err, req, res, next) => {
  console.error("Global error handler:", err);
  res.status(500).json({
    status: "error",
    message: "Internal server error",
    error: err.message,
  });
});


mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("DB connected successfully"))
  .catch((error) => console.error("DB connection error:", error));


server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});