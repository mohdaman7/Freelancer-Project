import express from "express";
import {
  registerClient,
  loginClient,
  getClientProfile,
  updateClientBalance,
  getClientStats,
} from "../controllers/clientController.js";
import { authenticateUser } from "../middlewares/userMiddleware.js";

const router = express.Router();


router.post("/register", registerClient); 
router.post("/login", loginClient); 


router.get("/profile", authenticateUser(['client']), getClientProfile); 
router.patch('/balance', authenticateUser(['client']), updateClientBalance);

router.get('/stats',authenticateUser(['client']), getClientStats);


export default router;
