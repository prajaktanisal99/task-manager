import { BASE_URL } from "../../constants";
import { QueryParams, TaskType } from "../../types";

export const updateTask = async (taskData: TaskType, query: QueryParams = {}) => {
	let url = `${BASE_URL}/tasks/${taskData._id}`;
	try {
		if (query?.action) {
			url += `?action=${query?.action}`;
		}
		const res = await fetch(url, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(taskData),
		});

		if (!res.ok) {
			throw new Error("Failed to update task");
		}

		return await res.json();
	} catch (error) {
		console.error("Error updating task ", error);
		throw error;
	}
};
