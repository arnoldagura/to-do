import React from "react";
import { Status, Task } from "../store/task";

interface TaskItemProps {
  task: Task;
  style: React.CSSProperties;
  onOpenUpdateModal: (task: Task) => void;
  onUpdate: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  style,
  onOpenUpdateModal,
  onUpdate,
  onDelete,
}) => {
  const isOverdue =
    new Date(task.dueDate) < new Date() && task.status !== "Completed";

  function updateStatus(status: Status) {
    const updatedTask = { ...task, status };

    onUpdate(updatedTask);
  }

  function openUpdateModal(task: Task) {
    onOpenUpdateModal(task);
  }

  type StatusAction = {
    label: string;
    status: Status;
    className: string;
  };

  const statusActions: Record<Status, StatusAction[]> = {
    Pending: [
      {
        label: "In Progress",
        status: "In Progress",
        className:
          "px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600",
      },
      {
        label: "Complete",
        status: "Completed",
        className:
          "px-4 py-2 text-sm bg-green-500 text-white rounded-md hover:bg-green-600",
      },
    ],
    "In Progress": [
      {
        label: "Complete",
        status: "Completed",
        className:
          "px-4 py-2 text-sm bg-green-500 text-white rounded-md hover:bg-green-600",
      },
    ],
    Completed: [],
  };

  const renderStatusActions = () =>
    statusActions[task.status]?.map(({ label, status, className }) => (
      <button
        key={status}
        onClick={() => updateStatus(status)}
        className={`px-4 py-2 text-sm text-white rounded-md hover:${className}`}
      >
        {label}
      </button>
    ));
  return (
    <div
      className={`p-4 mb-4 rounded-lg shadow-md ${
        isOverdue ? "bg-red-100 border-red-500" : "bg-white border-gray-300"
      } border`}
      style={style}
    >
      <div className="flex ml-auto items-center">
        <h2 className="text-xl font-semibold">{task.title}</h2>
        <div className="flex ml-auto">
          <button
            onClick={() => openUpdateModal(task)}
            className="px-4 py-2 text-sm bg-orange-500 text-white rounded-md hover:bg-orange-600"
          >
            Update
          </button>{" "}
          <button
            onClick={() => onDelete(task.id)}
            className="px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>

      <p className="text-gray-700">{task.description}</p>

      <p className="text-sm text-gray-500">
        Due Date: {new Date(task.dueDate).toLocaleDateString()}
      </p>

      <p
        className={`text-sm mt-2 font-bold ${getStatusClassName(task.status)}`}
      >
        Status: {task.status}
      </p>

      <div className="flex">{renderStatusActions()}</div>
    </div>
  );
};

const getStatusClassName = (status: string) => {
  switch (status) {
    case "Pending":
      return "-bold text-yellow-500";
    case "In Progress":
      return "text-bold text-blue-500";
    case "Completed":
      return "text-green-500";
    default:
      return "text-gray-500";
  }
};

export default React.memo(TaskItem);
