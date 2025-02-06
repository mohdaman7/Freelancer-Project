import Developer from "../models/developerModel.js";
import Client from "../models/clientModel.js";
import Transaction from "../models/transactionModel.js";
import Job from '../models/jobModel.js'
import Feedback from '../models/feedbackModel.js'
import jwt from "jsonwebtoken";


export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){

      const token = jwt.sign({ email }, process.env.ADMIN_SECRET_KEY);
      res.cookie("token", token, { httpOnly: true });
      return res.status(200).json({ message: "Admin logged in successfully", token });

    }

    res.status(401).json({ message: "Unauthorized" });
};

export const viewAllDevelopers = async (req, res) => {

    try {

      const developers = await Developer.find();
      if(developers.length===0){
        return res.status(404).json({message:'No users in database'})
      }
      res.status(200).json({ message: "Developers fetched successfully", developers });
    
    } catch (error) {
      res.status(500).json({ message: "Error fetching developers", error });
    }
};


export const viewDeveloperById = async (req,res) => {
  try {
    const {id} = req.params;
    const developer = await Developer.findById(id);
    if(!developer) {
      return res.status(404).json({ message: "Developer not found"});
    }
    res.status(200).json({ message: "Developer fetched successfully", developer})
  } catch (error) {
    res.status(500).json({ message: "Error fetching developer",error})
  }
};

export const blockDeveloperById = async (req, res) => {
  try {
    const { id } = req.params;
    const developer = await Developer.findByIdAndUpdate(id, { status: false }, { new: true });
    if (!developer) {
      return res.status(404).json({ message: "Developer not found" });
    }
    res.status(200).json({ message: "Developer blocked successfully", developer });
  } catch (error) {
    res.status(500).json({ message: "Error blocking developer", error });
  }
};

export const updateDeveloper = async (req,res) => {
  try{
    const {id} = req.params;
    const updates = req.body;
    const updatedDeveloper = await Developer.findByIdAndUpdate(id,updates,{new:true});
    if(!updatedDeveloper){
      return res.status(404).json({ message: "Developer not found"});
    }
    res.status(200).json({ message: "Developer updated successfully", updatedDeveloper});
  } catch (error) {
    res.status(500).json({ message: "Error updating developer", error});
  }
}

export const deleteDeveloper = async (req, res) => {
  try {
    const { id } = req.params;
    const developer = await Developer.findByIdAndDelete(id);
    if (!developer) {
      return res.status(404).json({ message: "Developer not found" });
    }
    res.status(200).json({ message: "Developer deleted successfully", developer });
  } catch (error) {
    res.status(500).json({ message: "Error deleting developer", error });
  }
};




export const viewAllClients = async (req, res) => {
  try {

    const clients = await Client.find();
    if(clients.length===0){
      return res.status(404).json({message:'No users in database'})
    }
    res.status(200).json({ message: "Clients fetched successfully", clients });
  
  } catch (error) {
    res.status(500).json({ message: "Error fetching clients", error });
  }
};


export const viewClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findById(id);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json({ message: "Client fetched successfully", client });
  } catch (error) {
    res.status(500).json({ message: "Error fetching client", error });
  }
};


export const blockClientById = async (req,res) => {
  try {
    const {id} = req.params;
    const client = await Client.findByIdAndUpdate(id, {status:false},{new:true});
    if(!client) {
      return res.status(404).json({ message: "Client not found"})
    }
    res.status(200).json({ message: "Client blocked successfully", client});
  } catch (error) {
    res.status(500).json({ message: "Error blocking client", error})
  }
}


export const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedClient = await Client.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedClient) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json({ message: "Client updated successfully", updatedClient });
  } catch (error) {
    res.status(500).json({ message: "Error updating client", error });
  }
};


export const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findByIdAndDelete(id);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json({ message: "Client deleted successfully", client });
  } catch (error) {
    res.status(500).json({ message: "Error deleting client", error });
  }
};


export const generateReports = async (req, res) => {
    try {
      const totalDevelopers = await Developer.countDocuments();
      const totalClients = await Client.countDocuments();
      const totalJobs = await Job.countDocuments();
      const totalTransactions = await Transaction.countDocuments();
  
      const metrics = {
        totalDevelopers,
        totalClients,
        totalJobs,
        totalTransactions,
      };

      res.status(200).json({ message: "Platform metrics generated successfully", metrics });
    } catch (error) {
      res.status(500).json({ message: "Error generating reports", error });
    }
};


export const monitorJobs = async (req, res) => {
    try {
      const jobs = await Job.find();
      res.status(200).json({ message: "Jobs fetched successfully", jobs });
    } catch (error) {
      res.status(500).json({ message: "Error fetching jobs", error });
    }
};


export const monitorTransactions = async (req,res) => {
    try{
        const transactions = await Transaction.find();
        res.status(200).json({ message: "Transactions fetched successfully",transactions })
    } catch (error) {
        res.status(500).json({message: "Error fetching feedback",error});
    }
}
 

export const monitorFeedback = async (req, res) => {
    try {
      const feedbacks = await Feedback.find().populate("developerId clientId");
      res.status(200).json({ message: "Feedback fetched successfully", feedbacks });
    } catch (error) {
      res.status(500).json({ message: "Error fetching feedback", error });
    }
};
  

export const getDashboardMetrics = async (req, res) => {
  try {
   
    const totalDevelopers = await Developer.countDocuments();
    const totalClients = await Client.countDocuments();
    const totalUsers = totalDevelopers + totalClients;

    
    const activeJobs = await Job.countDocuments({ status: "active" });

    
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const monthlyRevenue = await Transaction.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);
    const revenue = monthlyRevenue.length > 0 ? monthlyRevenue[0].total : 0;

   
    const pendingIssues = await Feedback.countDocuments({ status: "pending" });

    
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const userActivity = await Developer.aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo },
        },
      },
      {
        $group: {
          _id: { $dayOfWeek: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          day: "$_id",
          count: 1,
          _id: 0,
        },
      },
    ]);

    
    const revenueData = await Transaction.aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo },
        },
      },
      {
        $group: {
          _id: { $dayOfWeek: "$createdAt" },
          total: { $sum: "$amount" },
        },
      },
      {
        $project: {
          day: "$_id",
          total: 1,
          _id: 0,
        },
      },
    ]);


    const recentActivities = await Feedback.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("developerId clientId");

    res.status(200).json({
      message: "Dashboard metrics fetched successfully",
      metrics: {
        totalUsers,
        activeJobs,
        monthlyRevenue: revenue,
        pendingIssues,
      },
      userActivity,
      revenueData,
      recentActivities,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard metrics", error });
  }
};

