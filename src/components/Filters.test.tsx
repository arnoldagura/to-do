import { render, screen, fireEvent } from "@testing-library/react";
import Filters from "./Filters";

describe("Filters Component", () => {
  const mockOnFilterChange = jest.fn();
  const mockOnSearchChange = jest.fn();

  const filterStatus = "ALL";
  const searchQuery = "";

  beforeEach(() => {
    mockOnFilterChange.mockClear();
    mockOnSearchChange.mockClear();
  });

  it("renders the filter dropdown with the correct status options", () => {
    render(
      <Filters
        filterStatus={filterStatus}
        onFilterChange={mockOnFilterChange}
        searchQuery={searchQuery}
        onSearchChange={mockOnSearchChange}
      />
    );

    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Pending")).toBeInTheDocument();
    expect(screen.getByText("In Progress")).toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();
  });

  it("calls onFilterChange when a new status is seleccted", () => {
    render(
      <Filters
        filterStatus={filterStatus}
        onFilterChange={mockOnFilterChange}
        searchQuery={searchQuery}
        onSearchChange={mockOnSearchChange}
      />
    );

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "In Progress" } });

    expect(mockOnFilterChange).toHaveBeenCalledWith("In Progress");
  });

  it("calls onSearchChange when ttext is entered into the search bar", () => {
    render(
      <Filters
        filterStatus={filterStatus}
        onFilterChange={mockOnFilterChange}
        searchQuery={searchQuery}
        onSearchChange={mockOnSearchChange}
      />
    );

    const searchInput = screen.getByPlaceholderText("Search Tasks");
    fireEvent.change(searchInput, { target: { value: "Test Task" } });

    expect(mockOnSearchChange).toHaveBeenCalledWith("Test Task");
  });

  it("displays the current filter status in the dropdown", () => {
    render(
      <Filters
        filterStatus="Pending"
        onFilterChange={mockOnFilterChange}
        searchQuery={searchQuery}
        onSearchChange={mockOnSearchChange}
      />
    );

    expect(screen.getByDisplayValue("Pending")).toBeInTheDocument();
  });
});
