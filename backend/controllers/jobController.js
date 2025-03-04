import Job from "../models/jobModel.js";
import Proposal from "../models/proposalModel.js";
import Notification from "../models/notificationModel.js";


export const createJob = async (req, res) => {
  try {
    const clientId = req.user.id;
    console.log("Request Body:", req.body);

    const skillsRequired = req.body.skillsRequired || "";
    const skillsArray = typeof skillsRequired === "string"
      ? skillsRequired.split(",").map(skill => skill.trim())
      : [];

    const newJob = new Job({
      title: req.body.title,
      description: req.body.description,
      skillsRequired: skillsArray,
      budget: req.body.budget,
      deadline: req.body.deadline,
      clientId: clientId,
    });

    const savedJob = await newJob.save();

    res.status(201).json({
      status: "success",
      message: "Job created successfully",
      data: savedJob,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        status: "error",
        message: "Validation failed",
        errors: messages,
      });
    }
    res.status(500).json({
      status: "error",
      message: "Server error",
      error: error.message,
    });
  }
};

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ status: 'Open' })
      .populate('clientId', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      results: jobs.length,
      data: jobs,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Server error',
      error: error.message,
    });
  }
};

export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('clientId', 'name email')
      .populate('proposals.developerId', 'name skills');

    if (!job) {
      return res.status(404).json({
        status: 'error',
        message: 'Job not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: job,
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        status: 'error',
        message: 'Job not found',
      });
    }
    res.status(500).json({
      status: 'error',
      message: 'Server error',
      error: error.message,
    });
  }
};

export const submitProposal = (io) => async (req, res) => {
  try {
    const { proposalText, proposedBudget, proposedDeadline } = req.body;
    const jobId = req.params.id;
    const developerId = req.user.id;

    // Validate required fields
    if (!proposalText || !proposedBudget || !proposedDeadline) {
      return res.status(400).json({
        status: "error",
        message: "All fields are required.",
      });
    }

    // Check if the job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        status: "error",
        message: "Job not found",
      });
    }

    // Create and save the proposal
    const newProposal = new Proposal({
      jobId,
      developerId,
      proposalText,
      proposedBudget,
      proposedDeadline,
      status: "pending",
    });

    const savedProposal = await newProposal.save();

    // Add the proposal to the job's proposals array
    job.proposals.push(savedProposal._id);
    await job.save();

    // Create a notification for the client
    const notification = new Notification({
      userId: job.clientId,
      message: `New proposal for "${job.title}"`,
      type: "newProposal",
      jobId: job._id,
      proposalId: savedProposal._id,
    });
    await notification.save();

    // Emit a real-time notification to the client
    io.emit("notification", {
      type: "newProposal",
      userId: job.clientId.toString(),
      message: `New proposal for "${job.title}"`,
      jobId: job._id,
      proposalId: savedProposal._id,
    });

    res.status(201).json({
      status: "success",
      message: "Proposal submitted successfully",
      data: savedProposal,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Server error",
      error: error.message,
    });
  }
};

export const handleProposalDecision = (io) => async (req, res) => {
  try {
    const { proposalId, status } = req.body;
    const proposal = await Proposal.findById(proposalId).populate("jobId");

    if (!proposal) {
      return res.status(404).json({
        status: "error",
        message: "Proposal not found",
      });
    }

    // Update proposal status
    proposal.status = status;
    await proposal.save();

    // Create a notification for the developer
    const notification = new Notification({
      userId: proposal.developerId,
      message: `Your proposal for "${proposal.jobId.title}" was ${status}`,
      type: "proposalDecision",
      jobId: proposal.jobId._id,
    });
    await notification.save();

    // Emit a real-time notification to the developer
    io.emit("notification", {
      type: "proposalDecision",
      userId: proposal.developerId.toString(),
      message: `Your proposal for "${proposal.jobId.title}" was ${status}`,
      jobId: proposal.jobId._id,
    });

    res.status(200).json({
      status: "success",
      message: `Proposal ${status}`,
      data: proposal,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Server error",
      error: error.message,
    });
  }
};

export const updateJobStatus = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        status: 'error',
        message: 'Job not found',
      });
    }

    if (job.clientId.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        status: 'error',
        message: 'Not authorized to update this job',
      });
    }

    job.status = req.body.status;
    await job.save();

    res.status(200).json({
      status: 'success',
      message: 'Job status updated successfully',
      data: job,
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        status: 'error',
        message: 'Job not found',
      });
    }
    res.status(500).json({
      status: 'error',
      message: 'Server error',
      error: error.message,
    });
  }
};