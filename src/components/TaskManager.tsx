import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import {
  addTask,
  deleteTask,
  FilterStatus,
  selectFilteredTasks,
  Task,
  updateFilters,
  updateTask,
} from "../store/task";
import Filters from "./Filters";
import AddTaskForm from "./TaskForm";
import Modal from "./Modal";
import TaskList from "./TaskList";

const TaskManager: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectFilteredTasks);

  const [filterStatus, setFiltersStatus] = useState<FilterStatus>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const debouncedUpdateFilters = useRef(
    debounce((filters: { title: string; status: FilterStatus }) => {
      dispatch(updateFilters(filters));
    }, 300)
  ).current;

  useEffect(() => {
    debouncedUpdateFilters({
      title: searchQuery,
      status: filterStatus,
    });
  }, [searchQuery, filterStatus, debouncedUpdateFilters]);

  useEffect(() => {
    return () => {
      debouncedUpdateFilters.cancel();
    };
  }, [debouncedUpdateFilters]);

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
    console.log("task", task);
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
        filterStatus={filterStatus}
        onFilterChange={handleFilterChange}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />

      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
      >
        <AddTaskForm
          onAddTask={onAddTask}
          onClose={closeModal}
        />
      </Modal>

      <div className="flex justify-end">
        <button
          onClick={openModal}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>

      <TaskList
        tasks={tasks}
        onUpdate={onUpdateTask}
        onDelete={onDeleteTask}
      />
    </div>
  );
};

export default TaskManager;
