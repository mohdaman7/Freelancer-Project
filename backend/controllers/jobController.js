import Job from "../models/jobModel.js";


export const createJob = async (req, res) => {
  try {
    // Get client ID from authenticated user
    const clientId = req.user._id;

    // Convert skillsRequired string to array
    const skillsArray = req.body.skillsRequired
      .split(',')
      .map((skill) => skill.trim());

    // Create new job
    const newJob = new Job({
      title: req.body.title,
      description: req.body.description,
      skillsRequired: skillsArray,
      budget: req.body.budget,
      deadline: req.body.deadline,
      clientId: clientId,
    });

    // Save job to database
    const savedJob = await newJob.save();

    // Return success response
    res.status(201).json({
      status: 'success',
      message: 'Job created successfully',
      data: savedJob,
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: messages,
      });
    }
    // Handle other errors
    res.status(500).json({
      status: 'error',
      message: 'Server error',
      error: error.message,
    });
  }
};


export const getJobs = async (req, res) => {
  try {
    // Fetch all open jobs with client details
    const jobs = await Job.find({ status: 'Open' })
      .populate('clientId', 'name email')
      .sort({ createdAt: -1 });

    // Return success response
    res.status(200).json({
      status: 'success',
      results: jobs.length,
      data: jobs,
    });
  } catch (error) {
    // Handle server errors
    res.status(500).json({
      status: 'error',
      message: 'Server error',
      error: error.message,
    });
  }
};


export const getJobById = async (req, res) => {
  try {
    // Find job by ID
    const job = await Job.findById(req.params.id)
      .populate('clientId', 'name email')
      .populate('proposals.developerId', 'name skills');

    // If job not found
    if (!job) {
      return res.status(404).json({
        status: 'error',
        message: 'Job not found',
      });
    }

    // Return success response
    res.status(200).json({
      status: 'success',
      data: job,
    });
  } catch (error) {
    // Handle invalid ObjectId
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        status: 'error',
        message: 'Job not found',
      });
    }
    // Handle server errors
    res.status(500).json({
      status: 'error',
      message: 'Server error',
      error: error.message,
    });
  }
};


export const updateJobStatus = async (req, res) => {
  try {
    // Find job by ID
    const job = await Job.findById(req.params.id);

    // If job not found
    if (!job) {
      return res.status(404).json({
        status: 'error',
        message: 'Job not found',
      });
    }

    // Verify client ownership
    if (job.clientId.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        status: 'error',
        message: 'Not authorized to update this job',
      });
    }

    // Update job status
    job.status = req.body.status;
    await job.save();

    // Return success response
    res.status(200).json({
      status: 'success',
      message: 'Job status updated successfully',
      data: job,
    });
  } catch (error) {
    // Handle invalid ObjectId
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        status: 'error',
        message: 'Job not found',
      });
    }
    // Handle server errors
    res.status(500).json({
      status: 'error',
      message: 'Server error',
      error: error.message,
    });
  }
};