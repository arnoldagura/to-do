import React, { useState } from "react";
import { Task } from "../store/task";
import { v4 as uuidv4 } from "uuid";

interface TaskFormProps {
  initialTask: Task | null;
  onSubmitTask: (task: Task) => void;
  onClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({
  initialTask,
  onSubmitTask,
  onClose,
}) => {
  const [title, setTitle] = useState<string>(initialTask?.title || "");
  const [description, setDescription] = useState<string>(
    initialTask?.description || ""
  );
  const [dueDate, setDueDate] = useState<string>(initialTask?.dueDate || "");

  const handleAddTask = () => {
    if (!title || !dueDate) {
      alert("Please fill in all required fields.");
      return;
    }

    const newTask: Task = {
      id: initialTask?.id || uuidv4(),
      title,
      description,
      status: initialTask?.status || "Pending",
      dueDate,
    };

    onSubmitTask(newTask);

    setTitle("");
    setDescription("");
    setDueDate("");
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4">
        {initialTask ? "Edit Task" : "Add New Task"}
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddTask();
        }}
      >
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title:
          </label>
          <input
            id="title"
            type="text"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description:
          </label>
          <textarea
            id="description"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="dueDate"
            className="block text-sm font-medium text-gray-700"
          >
            Due Date:
          </label>
          <input
            id="dueDate"
            type="date"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>

        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
          >
            {initialTask ? "Update Task" : "Add Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
