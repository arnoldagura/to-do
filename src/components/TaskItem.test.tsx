import { render, screen, fireEvent } from "@testing-library/react";
import TaskItem from "./TaskItem";
import { Task } from "../store/task";

describe("TaskItem Component", () => {
  const mockUpdate = jest.fn();
  const mockDelete = jest.fn();
  const mockOpenModal = jest.fn();

  const task: Task = {
    id: "1",
    title: "Test Task",
    description: "This is a test task",
    status: "Pending",
    dueDate: "2024-12-01",
  };

  it("renders task title and description", () => {
    render(
      <TaskItem
        task={task}
        style={{}}
        onOpenUpdateModal={mockOpenModal}
        onUpdate={mockUpdate}
        onDelete={mockDelete}
      />
    );

    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByText("This is a test task")).toBeInTheDocument();
  });

  it("calls update function when status is changed", () => {
    render(
      <TaskItem
        task={task}
        style={{}}
        onOpenUpdateModal={mockOpenModal}
        onUpdate={mockUpdate}
        onDelete={mockDelete}
      />
    );

    const updateButton = screen.getByText("In Progress");
    fireEvent.click(updateButton);
    expect(mockUpdate).toHaveBeenCalledWith({
      ...task,
      status: "In Progress",
    });
  });

  it("opens modal when update button is clicked", () => {
    render(
      <TaskItem
        task={task}
        style={{}}
        onOpenUpdateModal={mockOpenModal}
        onUpdate={mockUpdate}
        onDelete={mockDelete}
      />
    );

    const updateButton = screen.getByText("Update");
    fireEvent.click(updateButton);
    expect(mockOpenModal).toHaveBeenCalledWith(task);
  });

  it("calls delete function when delete button is clicked", () => {
    render(
      <TaskItem
        task={task}
        style={{}}
        onOpenUpdateModal={mockOpenModal}
        onUpdate={mockUpdate}
        onDelete={mockDelete}
      />
    );

    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);
    expect(mockDelete).toHaveBeenCalledWith("1");
  });

  it("displays overdue task with red background", () => {
    const overdueTask = {
      ...task,
      dueDate: "2020-01-01",
      status: "Pending",
    } as Task;
    render(
      <TaskItem
        task={overdueTask}
        style={{}}
        onOpenUpdateModal={mockOpenModal}
        onUpdate={mockUpdate}
        onDelete={mockDelete}
      />
    );

    expect(screen.getByTestId("task-item")).toHaveClass(
      "bg-red-100 border-red-500"
    );
  });
});
