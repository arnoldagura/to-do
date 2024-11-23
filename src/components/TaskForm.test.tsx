import { render, screen, fireEvent } from "@testing-library/react";
import TaskForm from "./TaskForm";
import { Task } from "../store/task";

describe("AddTaskForm Component", () => {
  const mockSubmitTask = jest.fn();
  const mockClose = jest.fn();

  const initialTask: Task = {
    id: "1",
    title: "Test Task",
    description: "Task description",
    status: "Pending",
    dueDate: "2024-12-01",
  };

  it("renders the form with initial values", () => {
    render(
      <TaskForm
        initialTask={initialTask}
        onSubmitTask={mockSubmitTask}
        onClose={mockClose}
      />
    );

    expect(screen.getByLabelText("Title:")).toHaveValue("Test Task");
    expect(screen.getByLabelText("Description:")).toHaveValue(
      "Task description"
    );
    expect(screen.getByLabelText("Due Date:")).toHaveValue("2024-12-01");
  });

  it("calls onSubmitTask when adding a new task", () => {
    render(
      <TaskForm
        initialTask={null}
        onSubmitTask={mockSubmitTask}
        onClose={mockClose}
      />
    );

    fireEvent.change(screen.getByLabelText("Title:"), {
      target: { value: "New Task" },
    });
    fireEvent.change(screen.getByLabelText("Due Date:"), {
      target: { value: "2024-12-05" },
    });
    fireEvent.click(screen.getByText("Add Task"));
    expect(mockSubmitTask).toHaveBeenCalledWith({
      id: expect.any(String),
      title: "New Task",
      description: "",
      status: "Pending",
      dueDate: "2024-12-05",
    });
  });

  it("calls onClose when cancelling the form", () => {
    render(
      <TaskForm
        initialTask={initialTask}
        onSubmitTask={mockSubmitTask}
        onClose={mockClose}
      />
    );
    fireEvent.click(screen.getByText("Cancel"));
    expect(mockClose).toHaveBeenCalled();
  });
});
