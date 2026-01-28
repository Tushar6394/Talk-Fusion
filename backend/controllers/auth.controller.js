import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid Username or Password" });
    }

    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error("Error in Login Controller due to ", error.message);
    
    // Check if it's a MongoDB connection error
    if (error.message.includes("connect ECONNREFUSED") || error.message.includes("No servers") || error.message.includes("MONGODB")) {
      return res.status(500).json({ error: "Database connection error. Please check MongoDB Atlas IP whitelist." });
    }
    
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in Signup Controller due to ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }
    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    await newUser.save();
    
    generateTokenAndSetCookie(newUser._id, res);

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.error("❌ Error in Signup Controller:", error.message);
    console.error("Stack:", error.stack);
    
    // Check if it's a MongoDB connection error
    if (error.message.includes("connect ECONNREFUSED") || error.message.includes("No servers") || error.message.includes("MONGODB")) {
      return res.status(500).json({ error: "Database connection error. Please check MongoDB Atlas IP whitelist." });
    }
    
    // Check if it's a JWT error
    if (error.message.includes("JWT") || error.message.includes("jwt")) {
      return res.status(500).json({ error: "JWT configuration error. Check JWT_SECRET environment variable." });
    }
    
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { login, logout, signup };
