import { useState } from "react";
import api from "../api/axios";

export default function AddTaskModal({ onClose, refresh }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "pending",
    due_date: ""
  });

  const submit = async (e) => {
    e.preventDefault();

    if (!form.title) return;

    await api.post("/tasks", form);
    refresh();
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <form onSubmit={submit}>
          <h2>Add New Task</h2>

          <input
            placeholder="Task Name"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <textarea
            placeholder="Short description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <select
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value })
            }
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In-Progress</option>
            <option value="completed">Completed</option>
          </select>

          <input
            type="date"
            value={form.due_date}
            onChange={(e) =>
              setForm({ ...form, due_date: e.target.value })
            }
          />

          <div className="modal-actions">
            <button type="submit" className="primary-btn">
              Add This Task
            </button>
            <button
              type="button"
              className="secondary"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
