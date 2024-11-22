import React, { useCallback } from "react";
import TaskItem from "./TaskItem";
import { Task } from "../store/task";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

interface TaskListProps {
  tasks: Task[];
  hasMore: boolean;
  isLoading: boolean;
  onOpenUpdateModal: (task: Task) => void;
  onUpdate: (task: Task) => void;
  onDelete: (taskId: string) => void;
  loadMoreTasks: (startIndex: number, stopIndex: number) => void;
}

const TaskRow: React.FC<{
  index: number;
  style: React.CSSProperties;
  data: TaskListProps & { tasks: Task[] };
}> = ({ index, style, data }) => {
  const task = data.tasks[index];
  return (
    <TaskItem
      key={task.id}
      task={task}
      style={style}
      onOpenUpdateModal={data.onOpenUpdateModal}
      onUpdate={data.onUpdate}
      onDelete={data.onDelete}
    />
  );
};

const MemoizedTaskRow = React.memo(TaskRow);

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  hasMore,
  isLoading,
  onOpenUpdateModal,
  onUpdate,
  onDelete,
  loadMoreTasks,
}) => {
  const listHeight = window.innerHeight - 250;
  const handleLoadMore = useCallback(
    (startIndex: number, stopIndex: number) => {
      if (!isLoading && hasMore) {
        loadMoreTasks(startIndex, stopIndex);
      }
    },
    [isLoading, hasMore, loadMoreTasks]
  );

  if (tasks.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        No tasks available.
      </div>
    );
  }

  const isItemLoaded = (index: number) => !!tasks[index];
  if (tasks.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        No tasks available.
      </div>
    );
  }

  return (
    <div
      className="task-list"
      style={{ height: `${listHeight}px` }}
    >
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        loadMoreItems={handleLoadMore}
        itemCount={hasMore ? tasks.length + 1 : tasks.length}
      >
        {({ onItemsRendered, ref }) => (
          <List
            height={listHeight}
            itemCount={tasks.length}
            itemSize={200}
            width="100%"
            itemData={{
              tasks,
              hasMore,
              isLoading,
              onOpenUpdateModal,
              onUpdate,
              onDelete,
              loadMoreTasks,
            }}
            onItemsRendered={onItemsRendered}
            ref={ref}
          >
            {MemoizedTaskRow}
          </List>
        )}
      </InfiniteLoader>
    </div>
  );
};

export default React.memo(TaskList);
