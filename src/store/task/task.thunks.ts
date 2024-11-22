import { createAsyncThunk } from "@reduxjs/toolkit";
import { FiltersType } from "./task.types";
import { RootState } from "../../store";

export const fetchMoreTasks = createAsyncThunk(
  "task/fetchMoreTasks",
  async (
    { page, filters }: { page: number; filters: FiltersType },
    { getState }
  ) => {
    const { allTasks } = (getState() as RootState).task;

    console.log("page", page);
    console.log("filters", filters);

    const start = page * 20;
    const end = start + 20;

    const filteredTasks = allTasks.filter((task) => {
      const matchesStatus =
        filters.status === "ALL" || task.status === filters.status;
      const matchesTitle = task.title
        .toLowerCase()
        .includes(filters.title.toLowerCase());
      return matchesStatus && matchesTitle;
    });

    return {
      data: filteredTasks.slice(start, end),
      total: filteredTasks.length,
    };
  }
);
