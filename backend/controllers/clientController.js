import Client from "../models/clientModel.js";
import Job from "../models/jobModel.js";
import { ClientRegisterJoi, ClientLoginJoi } from "../validation/Clientauthjoi.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";




export const registerClient = async (req, res) => {
  const { name, email, password, company } = req.body;

  try {
    
    const { error } = ClientRegisterJoi.validate({ name, email, password, company });
    if (error) {
      return res.status(400).json({ status: "error", message: error.details[0].message });
    }

    
    const isExistingClient = await Client.findOne({ email });
    if (isExistingClient) {
      return res.status(400).json({ status: "error", message: "Email already taken!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password (Before Saving):", hashedPassword);

    const client = new Client({ name, email, password: hashedPassword, company,role: "client" });
    await client.save();

    res.status(201).json({
      message: "Client registered successfully",
      client: { id: client._id, name: client.name, email: client.email },
    });
  } catch (error) {
    console.error("Error registering client:", error);
    res.status(500).json({ message: "Error registering client", error });
  }
};








export const loginClient = async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const { error } = ClientLoginJoi.validate({ email, password });
    if (error) {
      return res.status(400).json({ status: "error", message: error.details[0].message });
    }

   
    const client = await Client.findOne({ email });
    if (!client) {
      return res.status(401).json({ status: "error", message: "Invalid credentials" });
    }

    console.log("Stored Hashed Password:", client.password);
    console.log("Entered Password:", password);

    const isMatch = await bcrypt.compare(password, client.password);
    console.log("Password Match:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ status: "error", message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: client._id,
        email: client.email,
        role: client.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: "4h" }
    );


    res.cookie("token", token, { httpOnly: true, secure: true });

    res.status(200).json({
      message: "Login successful",
      client: { id: client._id, name: client.name, email: client.email },
      token,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error logging in", error });
  }
};




export const getClientProfile = async (req, res) => {
  const clientId = req.user.id; 
  try {
    const client = await Client.findById(clientId).select("-password"); 
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json(client);
  } catch (error) {
    console.error("Error fetching client profile:", error);
    res.status(500).json({ message: "Error fetching client profile", error: error.message });
  }
};



export const updateClientBalance = async (req,res) => {
  try{
    const client = await Client.findById(req.user.id);

    if(!client) {
      return res.status(404).json({message: "Client not found"});
    }

    client.balance += req.body.amount;
    await client.save();

    res.status(200).json({
      status:"success",
      data:{balance:client.balance}
    })

  }catch(error){
    res.stauts(500).json({
      status:"error",
      message:"Error updating balance",
      error: error.message
    })
  }
}


export const getClientStats = async (req,res) => {
  try{
    const clientId = req.user.id;

    const jobs = await Job.find({clientId});

    const completedProjects = jobs.filter(job => job.status === 'Completed').length;
    const activeProjects = jobs.filter(job => job.stauts === 'In Progress').length;
    const totalSpent = jobs.reduce((sum,job) => sum + (job.budget || 0),0);
    const avgRating = jobs.reduce((sum,job) => sum + (job.rating || 0),0) / jobs.length || 0;

    res.status(200).json({
      stauts: "success",
      data: {
        completedProjects,
        activeProjects,
        totalSpent,
        avgRating:avgRating.toFixed(1),
      },
    })

  }catch(error){
    res.status(500).json({
      status:"error",
      message: "Error fatching client stats",
      error: error.message,
    })
  }
}


