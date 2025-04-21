import { TaskColumnType, TaskResponseType } from "../../types";
import { transformTasksToColumns } from "../../utils";

export const getTasks = async (): Promise<Array<TaskColumnType>> => {
	const res = await fetch("http://localhost:3001/tasks", {
		method: "GET",
	});

	if (!res.ok) {
		console.error("Failed to fetch tasks:", res.statusText);
		throw new Error("Failed to fetch tasks");
	}
	const tasks: TaskResponseType[] = await res.json();

	const columns = transformTasksToColumns(tasks);
	return columns;
};
