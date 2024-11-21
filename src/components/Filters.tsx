import React from "react";
import { FilterStatus } from "../store/task";

interface FiltersProps {
  filterStatus: string;
  onFilterChange: (filter: FilterStatus) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
  filterStatus,
  onFilterChange,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="flex items-center justify-center">
      <div className="max-w-sm">
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <div className="inline-block relative">
              <select
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                value={filterStatus}
                onChange={(e) => onFilterChange(e.target.value as FilterStatus)}
              >
                <option value="ALL">All</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="md:w-2/3">
            <input
              className=" border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="text"
              placeholder="Search Tasks"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
