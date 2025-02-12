import express from "express";
import {
  registerClient,
  loginClient,
  getClientProfile,
} from "../controllers/clientController.js";
import { authenticateUser } from "../middlewares/userMiddleware.js";

const router = express.Router();


router.post("/register", registerClient); 
router.post("/login", loginClient); 


router.get("/profile/:id", authenticateUser(['client']), getClientProfile); 


export default router;
