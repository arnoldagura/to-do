import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Filters, Task, TasksState } from "./task.types";
import { RootState } from "../store";

export const sampleTasks: Task[] = [
  {
    id: "1",
    title: "Complete React Project",
    description:
      "Finalize the To-Do app and ensure all features are implemented.",
    status: "In Progress",
    dueDate: new Date(
      new Date().setDate(new Date().getDate() + 2)
    ).toISOString(), // 2 days from today
  },
  {
    id: "2",
    title: "Submit Assignment",
    description: "Prepare and submit the assignment to the instructor.",
    status: "Pending",
    dueDate: new Date(
      new Date().setDate(new Date().getDate() + 5)
    ).toISOString(),
  },
  {
    id: "3",
    title: "Team Meeting",
    description: "Discuss the project progress with the team.",
    status: "Completed",
    dueDate: new Date(
      new Date().setDate(new Date().getDate() - 3)
    ).toISOString(),
  },
  {
    id: "4",
    title: "Update Resume",
    description: "Add recent projects and skills to the resume.",
    status: "Pending",
    dueDate: new Date(
      new Date().setDate(new Date().getDate() - 1)
    ).toISOString(),
  },
  {
    id: "5",
    title: "Buy Groceries",
    description: "Milk, eggs, bread, and vegetables.",
    status: "Pending",
    dueDate: new Date(
      new Date().setDate(new Date().getDate() + 1)
    ).toISOString(),
  },
];
const initialState: TasksState = {
  tasks: sampleTasks,
  filters: {
    title: "",
    status: "ALL",
  },
};

export const selectFilteredTasks = createSelector(
  // Input selectors
  (state: RootState) => state.task.tasks,
  (state: RootState) => state.task.filters,
  // Output selector: filters the tasks
  (tasks, filters) => {
    const filtered = tasks.filter((task) => {
      const matchesStatus =
        filters.status === "ALL" || task.status === filters.status;
      const matchesTitle = task.title
        .toLowerCase()
        .includes(filters.title.toLowerCase());
      return matchesStatus && matchesTitle;
    });
    console.log("filters", filters);
    console.log("filtered", filtered);
    return filtered;
  }
);
export const taskSlice = createSlice({
  name: "taskStore",
  initialState: initialState,
  reducers: {
    setStatus: (
      state,
      action: PayloadAction<{
        id: string;
        status: "Pending" | "In Progress" | "Completed";
      }>
    ) => {
      const task = state.tasks.find((task) => task.id === action.payload.id);
      if (task) task.status = action.payload.status;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      console.log("action", action);
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.title = action.payload.title;
        task.description = action.payload.description;
        task.status = action.payload.status;
        task.dueDate = action.payload.dueDate;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateFilters: (state, action: PayloadAction<Filters>) => {
      state.filters = action.payload;
    },
  },
});

export const { setStatus, addTask, updateTask, deleteTask, updateFilters } =
  taskSlice.actions;

export default taskSlice.reducer;
