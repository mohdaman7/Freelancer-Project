import express from "express";
import {
  loginAdmin,
  viewAllDevelopers,
  viewAllClients,
  generateReports,
  monitorJobs,
  monitorTransactions,
  monitorFeedback,
} from "../controllers/adminController.js";

const router = express.Router();


router.post("/login", loginAdmin);
router.get("/developers", viewAllDevelopers);
router.get("/clients", viewAllClients);
router.get("/reports", generateReports);
router.get("/jobs", monitorJobs);
router.get("/transactions", monitorTransactions);
router.get("/feedback", monitorFeedback);

export default router;