const Task = require("../models/task.model");

/**
 * CREATE TASK
 * title: required
 * description: optional
 * due_date: optional
 * status: defaults to "pending"
 */

exports.createTask = async (req, res) => {
  const { title, description, due_date, status } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const task = await Task.create({
    title,
    description,
    due_date,
    status: status || "pending",
    user: req.userId
  });

  res.status(201).json(task);
};


/**
 * GET TASKS
 * Supports filtering by status
 * GET /api/tasks?status=pending
 */
exports.getTasks = async (req, res) => {
  const filter = { user: req.userId };

  if (req.query.status) {
    filter.status = req.query.status;
  }

  const tasks = await Task.find(filter).sort({ createdAt: -1 });
  res.json(tasks);
};

/**
 * UPDATE TASK
 * Can update title, description, status, due_date
 */
exports.updateTask = async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.userId },
    req.body,
    { new: true }
  );

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json(task);
};

/**
 * DELETE TASK
 */
exports.deleteTask = async (req, res) => {
  const task = await Task.findOneAndDelete({
    _id: req.params.id,
    user: req.userId
  });

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json({ message: "Task deleted" });
};
