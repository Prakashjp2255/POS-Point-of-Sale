const userModel = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

// Create a new user

const validateObjectId = (id) => {
  const mongoose = require("mongoose");
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return false; // Return false if the ID is invalid
  }
  return true;
};

exports.createUser = async (req, res) => {
  console.log("outside try....");
  try {
    console.log("inside try....");

    const userData = new userModel(req.body);

    const validemail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const { email } = userData;
    if (!validemail.test(email)) {
      return res.status(422).json({ error: "invalid email ! address " });
    }

    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists." });
    }

    const savedUser = await userData.save();
    return res.status(200).json(savedUser);
  } catch (error) {
    console.error("Error creating user:", error); // Added log
    return res.status(500).json({ error: "INTERNAL SERVER ERROR" });
  }
};

//get fetchusersbyid
exports.fetchUsersbyid = async (req, res) => {
  try {
      const { id } = req.params;

      // Validate ObjectId before querying
      if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ error: "Invalid user ID format" });
      }

      const user = await userModel.findById(id).select("-password");

      if (!user) {
          return res.status(404).json({ message: "User not found." });
      }

      res.status(200).json(user);
  } catch (error) {
      console.error("Error fetching user by ID:", error.message);
      res.status(500).json({ error: "INTERNAL SERVER ERROR" });
  }
};

// Fetch all users
exports.fetchUsers = async (req, res) => {
    try {
      console.log("Fetching all users...");
  
      // Fetch users from the database
      const users = await userModel.find();
      console.log("Database query executed successfully.");
  
      if (users.length === 0) {
        console.log("No users found in the database.");
        return res.status(404).json({ message: "No users found." });
      }
  
      console.log("Users fetched successfully:", users); // Be careful with logging sensitive data
      res.status(200).json(users);
    } catch (error) {
      console.error("Error occurred while fetching users:", error.message);
      res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
  };
  
    

// Update user by ID
exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { email } = req.body;

    // Check if user exists
    const userExist = await userModel.findOne({ _id: id });
    if (!userExist) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the new email already exists
    if (email && email !== userExist.email) {
      const emailExist = await userModel.findOne({ email });
      if (emailExist) {
        return res.status(400).json({ message: "Email already exists." });
      }
    }

    // Update user details
    const updatedUser = await userModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "INTERNAL SERVER ERROR" });
  }
};

// Delete user by ID
exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await userModel.findById({ _id: id });
    if (!userExist) {
      return res.status(404).json({ message: "User not found." });
    }
    await userModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Successfully deleted user." });
  } catch (error) {
    console.error("Error deleting user:", error); // Added log
    res.status(500).json({ error: "INTERNAL SERVER ERROR" });
  }
};

// User login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      console.log("User not found with email:", email); // Added log
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password mismatch for user:", email); // Added log
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Password matches, generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send success response
    return res.status(200).json({ message: "Successfully logged in!", token, user : user });
  } catch (error) {
    console.error("Error during login:", error); // Added log

    return res.status(500).json({ error });
  }
};
