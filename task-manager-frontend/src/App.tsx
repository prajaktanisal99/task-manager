import "./App.css";
import { TaskBoard } from "./components/task-board";
import { TaskProvider } from "./context";

function App() {
	return (
		<TaskProvider>
			<TaskBoard />
		</TaskProvider>
	);
}

export default App;
