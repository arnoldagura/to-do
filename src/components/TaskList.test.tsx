import { render, screen, fireEvent } from "@testing-library/react";
import TaskList from "./TaskList";
import { Task } from "../store/task";

describe("TaskList Component", () => {
  const mockUpdate = jest.fn();
  const mockDelete = jest.fn();
  const mockLoadMore = jest.fn();
  const mockOpenUpdateModal = jest.fn();

  const tasks: Task[] = [
    {
      id: "1",
      title: "Test Task 1",
      description: "",
      status: "Pending",
      dueDate: "2024-12-01",
    },
    {
      id: "2",
      title: "Test Task 2",
      description: "",
      status: "In Progress",
      dueDate: "2024-12-02",
    },
  ];

  it("renders task titles", () => {
    render(
      <TaskList
        tasks={tasks}
        hasMore={false}
        isLoading={false}
        onOpenUpdateModal={mockOpenUpdateModal}
        onUpdate={mockUpdate}
        onDelete={mockDelete}
        loadMoreTasks={mockLoadMore}
      />
    );

    expect(screen.getByText("Test Task 1")).toBeInTheDocument();
    expect(screen.getByText("Test Task 2")).toBeInTheDocument();
  });

  it("loads more tasks when scrolling", () => {
    render(
      <TaskList
        tasks={tasks}
        hasMore={true}
        isLoading={false}
        onOpenUpdateModal={mockOpenUpdateModal}
        onUpdate={mockUpdate}
        onDelete={mockDelete}
        loadMoreTasks={mockLoadMore}
      />
    );

    fireEvent.scroll(window, { target: { scrollY: 1000 } });
    expect(mockLoadMore).toHaveBeenCalled();
  });
});
