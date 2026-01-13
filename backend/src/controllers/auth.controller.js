import { User } from "../models/user.model.js";

/**
 * REGISTER
 * POST /api/auth/register
 */
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with email or username already exists" });
    }

    const user = await User.create({ username, email, password });

    const accessToken = user.generateAccessToken();

    res.status(201).json({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      accessToken,
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Registration failed" });
  }
};

/**
 * LOGIN
 * POST /api/auth/login
 */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = user.generateAccessToken();

    res.status(200).json({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      accessToken,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
};

/**
 * LOGOUT
 * POST /api/auth/logout
 */
export const logoutUser = async (req, res) => {
  // JWT is stateless → frontend deletes token
  res.status(200).json({ message: "Logged out successfully" });
};

/**
 * GET CURRENT USER
 * GET /api/auth/me
 */
export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Get current user error:", error);
    res.status(500).json({ message: "Failed to fetch user" });
  }
};

/**
 * UPDATE USER
 * PATCH /api/auth/me
 */
export const updateUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const { username, email, password } = req.body;

    const updates = {};
    if (username) updates.username = username;
    if (email) updates.email = email;
    if (password) updates.password = password; // will be hashed by pre-save hook

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    Object.assign(user, updates);
    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ message: "Failed to update profile" });
  }
};

/**
 * DELETE USER
 * DELETE /api/auth/me
 */
export const deleteUser = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User account deleted successfully" });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ message: "Failed to delete account" });
  }
};
