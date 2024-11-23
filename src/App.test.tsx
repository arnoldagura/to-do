import { render, screen } from "@testing-library/react";
import { act } from "react";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";

jest.mock("./components/TaskManager", () => () => (
  <div>Task Manager Component</div>
));

describe("App", () => {
  it("renders the header correctly", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText(/To do App/i)).toBeInTheDocument();
  });

  it("renders TaskManager component", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText(/Task Manager Component/i)).toBeInTheDocument();
  });

  it("provides Redux store to TaskManager component", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText(/Task Manager Component/i)).toBeInTheDocument();
  });
});
