const User = require("../models/user.model");
const generateToken = require("../config/jwt");
const { validateEmailPassword } = require("../utils/validators");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  const error = validateEmailPassword(email, password);
  if (error) return res.status(400).json({ message: error });

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({ name, email, password });
  res.status(201).json({ token: generateToken(user._id) });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const error = validateEmailPassword(email, password);
  if (error) return res.status(400).json({ message: error });

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  res.json({ token: generateToken(user._id) });
};
