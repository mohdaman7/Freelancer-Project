import Client from "../models/clientModel.js";
import ClientAuthJoi from "../validations/clientAuthJoi.js"; // Import your Joi schema

export const registerClient = async (req, res) => {
  const { name, email, password, company } = req.body;

  try {
    // Validate request body using Joi
    const { error } = ClientAuthJoi.validate({ name, email, password, company });
    if (error) {
      return res.status(400).json({
        status: "error",
        message: error.details[0].message, // Return the first validation error
      });
    }

    // Check if client already exists
    const isExistingClient = await Client.findOne({ email });
    if (isExistingClient) {
      return res
        .status(400)
        .json({ status: "error", message: "Email already taken!" });
    }

    // Create a new client
    const client = new Client({ name, email, password, company });
    await client.save();

    // Send response
    res.status(201).json({
      message: "Client registered successfully",
      client: { id: client._id, name: client.name, email: client.email },
    });
  } catch (error) {
    console.error("Error registering client:", error);
    res.status(500).json({ message: "Error registering client", error });
  }
};


// Login a client
export const loginClient = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate request body using Joi
    const { error } = ClentAuthJoi.validate({ email, password });
    if (error) {
      return res.status(400).json({
        status: "error",
        message: error.details[0].message, // Return the first validation error
      });
    }

    // Find the client by email
    const client = await Client.findOne({ email });
    if (!client) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password (plaintext comparison - not recommended for production)
    if (client.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: client._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expires in 1 hour
    });

    // Set token in HTTP-only cookie
    res.cookie("token", token, { httpOnly: true, secure: true }); // Use `secure: true` in production

    // Send response
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

// Get client profile
export const getClientProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const client = await Client.findById(id);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    // Send response (exclude sensitive data like password)
    res.status(200).json({
      id: client._id,
      name: client.name,
      email: client.email,
      company: client.company,
    });
  } catch (error) {
    console.error("Error fetching client profile:", error);
    res.status(500).json({ message: "Error fetching client profile", error });
  }
};

// Create a job
export const createJob = async (req, res) => {
  const { id } = req.params;
  const { title, description, category, budget, deadline } = req.body;

  try {
    // Validate request body (optional: add Joi validation for job creation)
    if (!title || !description || !category || !budget || !deadline) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new job
    const job = new Job({
      title,
      description,
      category,
      budget,
      deadline,
      clientId: id,
    });
    await job.save();

    // Send response
    res.status(201).json({ message: "Job created successfully", job });
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ message: "Error creating job", error });
  }
};