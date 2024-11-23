import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task, TasksState } from "./task.types";
import { RootState } from "../store";
import { v4 as uuidv4 } from "uuid";
import { fetchMoreTasks } from "./task.thunks";

export let sampleTasks = Array.from({ length: 1000 }, (_, i) => ({
  id: uuidv4(),
  title: `Task ${i + 1}`,
  description: `This is the description for Task ${i + 1}`,
  status: i % 3 === 0 ? "Pending" : i % 3 === 1 ? "In Progress" : "Completed",
  dueDate: new Date(new Date().setDate(new Date().getDate() + ((i % 10) - 5)))
    .toISOString()
    .split("T")[0],
})) as Task[];

const initialState: TasksState = {
  tasks: [],
  allTasks: sampleTasks,
  page: 0,
  isLoading: false,
  hasMore: true,
};

export const selectFilteredTasks = (state: RootState) => state.task.tasks;
export const selectHasMore = (state: RootState) => state.task.hasMore;
export const selectIsLoading = (state: RootState) => state.task.isLoading;

export const taskSlice = createSlice({
  name: "taskStore",
  initialState: initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.allTasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const task = state.allTasks.find((t) => t.id === action.payload.id);
      let taskFiltered = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.title = action.payload.title;
        task.description = action.payload.description;
        task.status = action.payload.status;
        task.dueDate = action.payload.dueDate;
        if (taskFiltered) {
          taskFiltered.title = action.payload.title;
          taskFiltered.description = action.payload.description;
          taskFiltered.status = action.payload.status;
          taskFiltered.dueDate = action.payload.dueDate;
        }
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.allTasks = sampleTasks.filter((task) => task.id !== action.payload);
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    resetTasks: (state) => {
      state.tasks = [];
      state.page = 0;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMoreTasks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchMoreTasks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.page += 1;
      state.tasks = [...state.tasks, ...action.payload.data];
      state.hasMore = action.payload.total > state.tasks.length;
    });
    builder.addCase(fetchMoreTasks.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { addTask, updateTask, deleteTask, resetTasks } =
  taskSlice.actions;

export default taskSlice.reducer;
