import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import TaskManager from "./components/TaskManager";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header>To do App</header>
        <TaskManager />
      </div>
    </Provider>
  );
}

export default App;
