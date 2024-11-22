import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { debounce } from "lodash";
import {
  addTask,
  deleteTask,
  fetchMoreTasks,
  FiltersType,
  FilterStatus,
  selectHasMore,
  selectIsLoading,
  Task,
  updateTask,
  resetTasks,
} from "../store/task";
import TaskForm from "./TaskForm";
import Modal from "./Modal";
import TaskList from "./TaskList";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import Filters from "./Filters";

const TaskManager: React.FC = () => {
  const dispatch = useAppDispatch();

  const { tasks, page } = useAppSelector((state) => state.task);
  const hasMore = useSelector(selectHasMore);
  const isLoading = useSelector(selectIsLoading);

  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [filterStatus, setFiltersStatus] = useState<FilterStatus>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filters = useMemo(
    () => ({
      title: searchQuery,
      status: filterStatus,
    }),
    [searchQuery, filterStatus]
  );
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openAddModal = () => {
    setCurrentTask(null);
    openModal();
  };
  const openUpdateModal = (task: Task) => {
    setCurrentTask(task);
    openModal();
  };
  const debouncedUpdateFilters = useRef(
    debounce((filters: FiltersType) => {
      dispatch(resetTasks());
      dispatch(fetchMoreTasks({ page: 0, filters }));
    }, 300)
  ).current;

  useEffect(() => {
    debouncedUpdateFilters(filters);

    return () => {
      debouncedUpdateFilters.cancel();
    };
  }, [filters]);

  const loadMoreTasks = (startIndex: number) => {
    if (!isLoading && hasMore) {
      const nextPage = Math.floor(startIndex / 20);
      dispatch(
        fetchMoreTasks({
          page: nextPage,
          filters,
        })
      );
    }
  };

  const handleFilterChange = (status: FilterStatus) => {
    setFiltersStatus(status);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const onAddTask = (task: Task) => {
    dispatch(addTask(task));
    closeModal();
  };

  const onUpdateTask = (task: Task) => {
    dispatch(updateTask(task));
    closeModal();
  };

  const onDeleteTask = (taskId: string) => {
    dispatch(deleteTask(taskId));
    closeModal();
  };

  return (
    <div className="task-manager p-6 max-w-7xl mx-auto space-y-6">
      <Filters
        filterStatus={filters.status}
        onFilterChange={handleFilterChange}
        searchQuery={filters.title}
        onSearchChange={handleSearchChange}
      />

      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
      >
        <TaskForm
          initialTask={currentTask}
          onSubmitTask={currentTask ? onUpdateTask : onAddTask}
          onClose={closeModal}
        />
      </Modal>

      <div className="flex justify-between items-center">
        <p className="flex text-center">{tasks.length} tasks</p>
        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>
      <TaskList
        tasks={tasks}
        hasMore={hasMore}
        isLoading={isLoading}
        loadMoreTasks={loadMoreTasks}
        onOpenUpdateModal={openUpdateModal}
        onUpdate={onUpdateTask}
        onDelete={onDeleteTask}
      />
    </div>
  );
};

export default TaskManager;
