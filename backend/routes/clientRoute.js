import express from "express";
import {
  registerClient,
  loginClient,
  getClientProfile,
  createJob,
} from "../controllers/clientController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();


router.post("/register", registerClient); // Register a new client
router.post("/login", loginClient); // Login client


router.get("/profile/:id", authenticateUser, getClientProfile); // Get client profile
router.post("/create-job/:id", authenticateUser, createJob); // Create a job

export default router;
