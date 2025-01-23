import Client from "../models/clientModel.js";
import jwt from "jsonwebtoken";

export const registerClient = async (req, res) => {
  const { name, email, password, company } = req.body;

  try {
    const isExcistingClient = await Client.findOne({ email: email });

    if (isExcistingClient) {
      return res
        .status(400)
        .json({ status: "error", message: "email already taken!" });
    }
    const client = new Client({ name, email, password, company });
    await client.save();
    res.status(201).json({ message: "Client registered successfully", client });
  } catch (error) {
    res.status(500).json({ message: "Error registering client", error });
  }
};


export const loginClient = async (req, res) => {
  const { email, password } = req.body;

  try {
    const client = await Client.findOne({ email });

    if (!client || client.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: client._id }, process.env.JWT_SECRET);
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ message: "Login successful", token });

  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};


export const getClientProfile = async (req, res) => {

    const { id } = req.params;

    try {

      const client = await Client.findById(id);

      if (!client) {
        return res.status(404).json({ message: "Client not found" });
      }
      res.status(200).json(client);

    } catch (error) {
      res.status(500).json({ message: "Error fetching client profile", error });
    }
};

export const createJob = async (req,res) => {
    const { id } = req.params;
    const { title, description ,category ,budget ,deadline } = req.body;

    try {
        const job = new Job({ title, description, category, budget, deadline, clientId: id})
        await job.save()
        res.status(201).json({ message: "Job created successfully", job});
    }catch(error){
        res.status(500).json({message: "Error creating job", error})
    }
}


