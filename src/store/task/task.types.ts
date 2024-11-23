export type Status = "Pending" | "In Progress" | "Completed";
export type FilterStatus = Status | "ALL";
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: Status;
  dueDate: string;
}

export interface TasksState {
  tasks: Task[];
  allTasks: Task[];
  page: number;
  isLoading: boolean;
  hasMore: boolean;
}

export interface FiltersType {
  title: string;
  status: FilterStatus;
}
