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
  filters: Filters;
}

export interface Filters {
  title: string;
  status: FilterStatus;
}
