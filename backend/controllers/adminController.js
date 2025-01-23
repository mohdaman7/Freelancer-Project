import Developer from "../models/developerModel.js";
import Client from "../models/clientModel.js";
import Transaction from "../models/transactionModel.js";
import Job from '../models/jobModel.js'
import Feedback from '../models/feedbackModel.js'
import jwt from "jsonwebtoken";


export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

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
  

