import { AppProvider } from "./AppContext";
import TaskFlow from "./task/TaskFlow";
import "./index.css";

export default function App() {
  return (
    <AppProvider>
      <TaskFlow />
    </AppProvider>
  );
}