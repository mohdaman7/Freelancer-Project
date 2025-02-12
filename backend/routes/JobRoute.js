import express from "express";
import {
  createJob,
  getJobs,
  getJobById,
  updateJobStatus,
} from "../controllers/jobController.js";
import { authenticateUser } from "../middlewares/userMiddleware.js";


const router = express.Router();



router.get("/jobs", getJobs);
router.get("/job/:id", getJobById);

router.post("/create-job", authenticateUser(['client']), createJob);
router.put("/job/:id/status", authenticateUser(['client']), updateJobStatus);

export default router;