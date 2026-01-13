import { useEffect, useState } from "react";
import api from "../api/axios";
import { DragDropContext } from "@hello-pangea/dnd";
import TaskColumn from "../components/TaskColumn";
import AddTaskModal from "../components/AddTaskModal";

export default function Board() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const onDragEnd = async ({ destination, draggableId }) => {
    if (!destination) return;
    await api.put(`/tasks/${draggableId}`, {
      status: destination.droppableId
    });
    fetchTasks();
  };

  return (
    <>
      {/* Added style={{ marginTop: '2rem' }} for spacing from navbar */}
      <div className="container" style={{ marginTop: '2rem' }}>
        <button className="add-task-btn" onClick={() => setShowModal(true)}>
          + Add New Task
        </button>
      </div>

      {showModal && (
        <AddTaskModal
          onClose={() => setShowModal(false)}
          refresh={fetchTasks}
        />
      )}

      <div className="container">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="kanban-board">
            {["pending", "in-progress", "completed"].map((status) => (
              <TaskColumn
                key={status}
                status={status}
                tasks={tasks.filter((t) => t.status === status)}
                refresh={fetchTasks}
              />
            ))}
          </div>
        </DragDropContext>
      </div>
    </>
  );
}