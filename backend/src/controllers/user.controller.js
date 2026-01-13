const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

exports.getProfile = async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  res.json(user);
};

exports.updateProfile = async (req, res) => {
  const updateData = { ...req.body };

  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10);
  }

  const user = await User.findByIdAndUpdate(
    req.userId,
    updateData,
    { new: true }
  ).select("-password");

  res.json(user);
};

exports.deleteProfile = async (req, res) => {
  await User.findByIdAndDelete(req.userId);
  res.json({ message: "User deleted" });
};
