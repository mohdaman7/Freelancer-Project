import express from "express";
import {
  loginAdmin,
  viewAllDevelopers,
  viewDeveloperById,
  blockDeveloperById,
  updateDeveloper,
  deleteDeveloper,
  viewAllClients,
  viewClientById,
  blockClientById,
  updateClient,
  deleteClient,
  generateReports,
  monitorJobs,
  monitorTransactions,
  monitorFeedback,
  getDashboardMetrics,
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/login", loginAdmin);

// Developer routes
router.get("/developers", viewAllDevelopers);
router.get("/developers/:id", viewDeveloperById);
router.put("/developers/:id", updateDeveloper);
router.patch("/developers/:id/block", blockDeveloperById);
router.delete("/developers/:id", deleteDeveloper);

// Client routes
router.get("/clients", viewAllClients);
router.get("/clients/:id", viewClientById);
router.put("/clients/:id", updateClient);
router.patch("/clients/:id/block", blockClientById);
router.delete("/clients/:id", deleteClient);

// Other routes
router.get('/dashboard-metrics',getDashboardMetrics)
router.get("/reports", generateReports);
router.get("/jobs", monitorJobs);
router.get("/transactions", monitorTransactions);
router.get("/feedback", monitorFeedback);

export default router;
