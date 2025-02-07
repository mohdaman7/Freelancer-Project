import express from "express";
import {
  registerClient,
  loginClient,
  getClientProfile,
  createJob,
} from "../controllers/clientController.js";
import { authenticateUser } from "../middlewares/userMiddleware.js";

const router = express.Router();


router.post("/register", registerClient); 
router.post("/login", loginClient); 


router.get("/profile/:id", authenticateUser, getClientProfile); 
router.post("/create-job/:id", authenticateUser, createJob); 

export default router;
