import React from "react";
import TaskItem from "./TaskItem";
import { Task } from "../store/task";
import { FixedSizeList as List } from "react-window";

interface TaskListProps {
  tasks: Task[];
  onUpdate: (task: Task) => void;
  onDelete: (taskId: string) => void;
}
const TaskList: React.FC<TaskListProps> = ({ tasks, onUpdate, onDelete }) => {
  return (
    <div
      className="task-list"
      style={{ height: "calc(100vh - 200px)" }}
    >
      <List
        height={800}
        width="100%"
        itemCount={tasks.length}
        itemSize={200}
        itemData={tasks}
      >
        {({ index }) => {
          const task = tasks[index];
          return (
            <TaskItem
              key={task.id}
              task={task}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          );
        }}
      </List>
    </div>
  );
};

export default TaskList;
