import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

export default function TaskColumn({ status, tasks, refresh }) {
  return (
    <Droppable droppableId={status}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          // Added data-status for CSS coloring
          data-status={status} 
          className={`kanban-column ${
            snapshot.isDraggingOver ? "drag-over" : ""
          }`}
        >
          <h3>{status.replace("-", " ").toUpperCase()}</h3>

          {tasks.map((task, index) => (
            <TaskCard
              key={task._id}
              task={task}
              index={index}
              refresh={refresh}
            />
          ))}

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}