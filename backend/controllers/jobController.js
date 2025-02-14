import Job from "../models/jobModel.js";


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