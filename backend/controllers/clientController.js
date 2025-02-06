import Client from "../models/clientModel.js";
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

    const client = new Client({ name, email, password: hashedPassword, company });
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

    const token = jwt.sign({ id: client._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

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
  const { id } = req.params;

  try {
    const client = await Client.findById(id).select("-password"); // Exclude password
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.status(200).json(client);
  } catch (error) {
    console.error("Error fetching client profile:", error);
    res.status(500).json({ message: "Error fetching client profile", error: error.message });
  }
};


export const createJob = async (req, res) => {
  const { id } = req.params;
  const { title, description, category, budget, deadline } = req.body;

  try {
    
    if (!title || !description || !category || !budget || !deadline) {
      return res.status(400).json({ message: "All fields are required" });
    }

    
    const job = new Job({
      title,
      description,
      category,
      budget,
      deadline,
      clientId: id,
    });
    await job.save();

    res.status(201).json({ message: "Job created successfully", job });
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ message: "Error creating job", error: error.message });
  }
};
