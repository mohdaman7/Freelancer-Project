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