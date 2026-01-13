import { Task } from "../models/task.model.js";

/**
 * CREATE TASK
 * POST /api/v1/tasks
 */
export const createTask = async (req, res) => {
  try {
    const { title, description, due_date } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await Task.create({
      title,
      description,
      due_date,
      user: req.user._id,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to create task" });
  }
};

/**
 * GET TASKS (with optional status filter)
 * GET /api/v1/tasks?status=pending
 */
export const getTasks = async (req, res) => {
  try {
    const { status } = req.query;

    const query = { user: req.user._id };
    if (status) query.status = status;

    const tasks = await Task.find(query).sort({ createdAt: -1 });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

/**
 * UPDATE TASK
 * PATCH /api/v1/tasks/:id
 */
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to update task" });
  }
};

/**
 * DELETE TASK
 * DELETE /api/v1/tasks/:id
 */
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task" });
  }
};

/**
 * UPDATE TASK STATUS (Drag & Drop)
 * PATCH /api/v1/tasks/:id/status
 */
export const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["pending", "in-progress", "completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { status },
      { new: true }
    );

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to update status" });
  }
};
