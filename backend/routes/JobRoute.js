import express from "express";
import {
  createJob,
  getJobs,
  getJobById,
  updateJobStatus,
  submitProposal,
  handleProposalDecision,
} from "../controllers/jobController.js";
import { authenticateUser } from "../middlewares/userMiddleware.js";

const router = express.Router();

// Export a function that accepts io
export const jobRoutes = (io) => {
  router.get("/jobs", getJobs);
  router.get("/job/:id", getJobById);
  router.post("/create-job", authenticateUser(["client"]), createJob);
  router.put("/job/:id/status", authenticateUser(["client"]), updateJobStatus);
  router.post("/job/:id/proposal", authenticateUser(["developer"]), submitProposal(io));
  router.post("/proposal/decision", authenticateUser(["client"]), handleProposalDecision(io));

  return router;
};