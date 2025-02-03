import Developer from "../models/developerModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Register Developer
export const registerDeveloper = async (req, res) => {
  const { firstName, lastName, email, password, title, hourlyRate, country, portfolioUrl, githubUrl, linkedinUrl } = req.body;

  try {
    // Check if email is already taken
    const isExistingUser = await Developer.findOne({ email });
    if (isExistingUser) {
      return res.status(400).json({ status: "error", message: "Email already taken!" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new developer
    const developer = new Developer({
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
      title,
      hourlyRate,
      country,
      portfolioUrl,
      githubUrl,
      linkedinUrl,
    });

    await developer.save();

    // Generate JWT token
    const token = jwt.sign({ id: developer._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Send response
    res.status(201).json({
      message: "Developer registered successfully",
      developer: {
        id: developer._id,
        name: developer.name,
        email: developer.email,
        title: developer.title,
      },
      token,
    });
  } catch (error) {
    console.error("Error registering developer:", error);
    res.status(500).json({ message: "Error registering developer", error });
  }
};

// Login Developer
export const loginDeveloper = async (req, res) => {
  const { email, password } = req.body;

  try {
    const developer = await Developer.findOne({ email });
    if (!developer) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, developer.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: developer._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Set token in HTTP-only cookie
    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });

    // Send response
    res.status(200).json({
      message: "Login successful",
      developer: {
        id: developer._id,
        name: developer.name,
        email: developer.email,
      },
      token,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error logging in", error });
  }
};

// Get Developer Profile
export const getDeveloperProfile = async (req, res) => {
  const { id } = req.user;

  try {
    const developer = await Developer.findById(id);
    if (!developer) {
      return res.status(404).json({ message: "Developer not found" });
    }

    // Exclude sensitive data
    const profile = {
      id: developer._id,
      name: developer.name,
      email: developer.email,
      title: developer.title,
      hourlyRate: developer.hourlyRate,
      country: developer.country,
      portfolioUrl: developer.portfolioUrl,
      githubUrl: developer.githubUrl,
      linkedinUrl: developer.linkedinUrl,
    };

    res.status(200).json(profile);
  } catch (error) {
    console.error("Error fetching developer profile:", error);
    res.status(500).json({ message: "Error fetching developer profile", error });
  }
};

// Update Developer Profile
export const updateDeveloperProfile = async (req, res) => {
  const { id } = req.params;
  const { name, title, hourlyRate, country, portfolioUrl, githubUrl, linkedinUrl } = req.body;

  try {
    const updatedDeveloper = await Developer.findByIdAndUpdate(
      id,
      { name, title, hourlyRate, country, portfolioUrl, githubUrl, linkedinUrl },
      { new: true }
    );

    if (!updatedDeveloper) {
      return res.status(404).json({ message: "Developer not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      developer: updatedDeveloper,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Error updating profile", error });
  }
};

// Add Service
export const addService = async (req, res) => {
  const { id } = req.params;
  const { serviceDetails } = req.body;

  try {
    const developer = await Developer.findById(id);
    if (!developer) {
      return res.status(404).json({ message: "Developer not found" });
    }

    developer.services.push(serviceDetails);
    await developer.save();

    res.status(201).json({
      message: "Service added successfully",
      services: developer.services,
    });
  } catch (error) {
    console.error("Error adding service:", error);
    res.status(500).json({ message: "Error adding service", error });
  }
};