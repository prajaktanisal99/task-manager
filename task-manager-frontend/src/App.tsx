import "./App.css";
import { TaskBoard } from "./components";
import { NotificationProvider, TaskProvider } from "./context";

function App() {
	return (
		<NotificationProvider>
			<TaskProvider>
				<TaskBoard />
			</TaskProvider>
		</NotificationProvider>
	);
}

export default App;
