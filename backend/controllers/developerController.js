import Developer from "../models/developerModel.js";
import jwt from "jsonwebtoken";

export const registerDeveloper = async (req, res) => {
  const { name, email, password, skills, portfolio } = req.body;

  try {
    const isExcistinguser = await Developer.findOne({ email: email });

    if (isExcistinguser) {
      return res
        .status(400)
        .json({ status: "error", message: "email already taken!" });
    }

    const developer = new Developer({
      name,
      email,
      password,
      skills,
      portfolio,
    });
    await developer.save();

    res
      .status(201)
      .json({ message: "Developer registered successfully", developer });
  } catch (error) {
    res.status(500).json({ message: "Error registering developer", error });
  }
};

export const loginDeveloper = async (req, res) => {
  const { email, password } = req.body;

  try {
    const developer = await Developer.findOne({ email });

    if (!developer || developer.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: developer._id }, process.env.JWT_SECRET);

    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getDeveloperProfile = async (req, res) => {
  const { id } = req.user;

  try {
    const developer = await Developer.findById(id);
    if (!developer) {
      return res.status(404).json({ message: "Developer not found" });
    }
    res.status(200).json(developer);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching developer profile", error });
  }
};

export const updateDeveloperProfile = async (req, res) => {
  const { id } = req.params;
  const { name, skills, portfolio } = req.body;
  try {
    const updatedDeveloper = await Developer.findByIdAndUpdate(
      id,
      { name, skills, portfolio },
      { new: true }
    );
    if (!updatedDeveloper) {
      return res.status(404).json({ message: "Developer not found" });
    }
    res
      .status(200)
      .json({ message: "Profile updated successfully", updatedDeveloper });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error });
  }
};

export const addService = async (req, res) => {
  const { id } = req.params;
  const { serviceDetails } = req.body;

  try {
    const developer = await Developer.findById(id);

    if (!developer) {
      return res.status(400).json({ message: "Developer not found" });
    }
    developer.services.push(serviceDetails);
    await developer.save();
    res
      .status(201)
      .json({
        message: "Service added successfully",
        services: developer.services,
      });
  } catch (error) {
    res.status(500).json({ message: "Error adding service", error });
  }
};
