import { Draggable } from "@hello-pangea/dnd";
import api from "../api/axios";

export default function TaskCard({ task, index, refresh }) {
  const deleteTask = async () => {
    await api.delete(`/tasks/${task._id}`);
    refresh();
  };

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="task-card"
          style={{ ...provided.draggableProps.style }}
        >
          <strong>{task.title}</strong>

          {task.description && (
            <p className="task-desc">{task.description}</p>
          )}

          <div className="task-footer">
            {task.due_date ? (
              <small className="task-date">
                {new Date(task.due_date).toLocaleDateString()}
              </small>
            ) : (
              <span></span> /* Spacer if no date */
            )}

            <button className="delete-btn" onClick={deleteTask}>
              Delete
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
}