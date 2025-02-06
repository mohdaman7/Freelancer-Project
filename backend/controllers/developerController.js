
import Developer from "../models/developerModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


export const registerDeveloper = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      title,
      hourlyRate,
      country,
      skills,
      experienceLevel,
      githubUrl,
      linkedinUrl,
      profilePhoto,
      bio,
      rating,
      status,
    } = req.body;

    
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    
    const isExistingUser = await Developer.findOne({ email });
    if (isExistingUser) {
      return res.status(400).json({ status: "error", message: "Email already taken!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);


    const developer = await Developer.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      title,
      hourlyRate,
      country,
      skills,
      experienceLevel,
      githubUrl,
      linkedinUrl,
      profilePhoto,
      bio,
      rating,
      status,
    });
    await developer.save();

  
    res.status(201).json({
      message: "Developer registered successfully",
      developer: {
        id: developer._id,
        name: `${developer.firstName} ${developer.lastName}`,
        email: developer.email,
        title: developer.title,
      },
    });
  } catch (error) {
    console.error("Error registering developer:", error);
    res.status(500).json({ message: "Error registering developer", error });
  }
};


export const loginDeveloper = async (req, res) => {
  const { email, password } = req.body;

  try {
    const developer = await Developer.findOne({ email });
    if (!developer) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    
    const isPasswordValid = await bcrypt.compare(password, developer.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    
    const token = jwt.sign({ id: developer._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

  
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


export const getDeveloperProfile = async (req, res) => {
  try {
    
    const developers = await Developer.find()
      .select("-password -__v -createdAt -updatedAt");

    if (!developers || developers.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No developers found",
      });
    }

    
    const profiles = developers.map((developer) => ({
      id: developer._id,
      name: `${developer.firstName} ${developer.lastName}`,
      email: developer.email,
      title: developer.title,
      hourlyRate: developer.hourlyRate,
      country: developer.country,
      githubUrl: developer.githubUrl,
      linkedinUrl: developer.linkedinUrl,
      skills: developer.skills,
      experienceLevel: developer.experienceLevel,
      profilePhoto: developer.profilePhoto,
      bio: developer.bio,
      rating: developer.rating,
      status: developer.status
    }));

    res.status(200).json({
      status: "success",
      results: developers.length,
      data: profiles,
    });
  } catch (error) {
    console.error("Error fetching developer profiles:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error fetching developer profiles",
    });
  }
};

// Get Developer Profile by ID
export const getDeveloperProfileById = async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch developer by ID, excluding sensitive data
    const developer = await Developer.findById(id)
      .select("-password -__v -createdAt -updatedAt");

    if (!developer) {
      return res.status(404).json({
        status: "error",
        message: "Developer not found",
      });
    }

    // Format the response
    const profile = {
      id: developer._id,
      name: `${developer.firstName} ${developer.lastName}`,
      email: developer.email,
      title: developer.title,
      hourlyRate: developer.hourlyRate,
      country: developer.country,
      githubUrl: developer.githubUrl,
      linkedinUrl: developer.linkedinUrl,
      skills: developer.skills,
      experienceLevel: developer.experienceLevel,
      profilePhoto: developer.profilePhoto,
      bio: developer.bio,
      rating: developer.rating,
      status: developer.status
    };

    res.status(200).json({
      status: "success",
      data: profile,
    });
  } catch (error) {
    console.error("Error fetching developer profile by ID:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error fetching developer profile",
    });
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