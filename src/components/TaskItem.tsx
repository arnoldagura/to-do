import React from "react";
import { FilterStatus, Status, Task } from "../store/task";

interface TaskItemProps {
  task: Task;
  onUpdate: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onUpdate, onDelete }) => {
  const isOverdue =
    new Date(task.dueDate) < new Date() && task.status !== "Completed";

  function updateStatus(status: Status) {
    const updatedTask = { ...task, status };

    onUpdate(updatedTask);
  }

  return (
    <div
      className={`p-4 mb-4 rounded-lg shadow-md ${
        isOverdue ? "bg-red-100 border-red-500" : "bg-white border-gray-300"
      } border`}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{task.title}</h2>
        <button
          onClick={() => onDelete(task.id)}
          className="text-2xl text-red-500 hover:text-red-700"
        >
          &times;
        </button>
      </div>

      <p className="text-gray-700">{task.description}</p>

      <p className="text-sm text-gray-500">
        Due Date: {new Date(task.dueDate).toLocaleDateString()}
      </p>

      <p className={`text-sm mt-2 ${getStatusClassName(task.status)}`}>
        Status: {task.status}
      </p>

      <div className="mt-4 flex space-x-2">
        {task.status === "Pending" && (
          <>
            <button
              onClick={() => updateStatus("In Progress")}
              className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              In Progress
            </button>
            <button
              onClick={() => updateStatus("Completed")}
              className="px-4 py-2 text-sm bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Complete
            </button>
          </>
        )}

        {task.status === "In Progress" && (
          <button
            onClick={() => updateStatus("Completed")}
            className="px-4 py-2 text-sm bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Complete
          </button>
        )}
      </div>
    </div>
  );
};

const getStatusClassName = (status: string) => {
  switch (status) {
    case "Pending":
      return "text-yellow-500";
    case "In Progress":
      return "text-blue-500";
    case "Completed":
      return "text-green-500";
    default:
      return "text-gray-500";
  }
};

export default TaskItem;
