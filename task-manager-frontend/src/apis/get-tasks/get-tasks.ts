import { BASE_URL } from "../../constants";
import { TaskColumnType, TaskType } from "../../types";
import { transformTasksToColumns } from "../../utils";

export const getTasks = async (): Promise<Array<TaskColumnType>> => {
	const url = `${BASE_URL}/tasks`;
	const res = await fetch(url, {
		method: "GET",
	});

	if (!res.ok) {
		console.error("Failed to fetch tasks:", res.statusText);
		throw new Error("Failed to fetch tasks");
	}
	const tasks: Array<TaskType> = await res.json();

	const columns = transformTasksToColumns(tasks);
	return columns;
};
