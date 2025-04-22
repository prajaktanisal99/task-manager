import { BASE_URL } from "../../constants";
import { TaskType } from "../../types";

export const addTask = async (newTask: TaskType) => {
	const url = `${BASE_URL}/tasks`;
	try {
		const res = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newTask),
		});

		if (!res.ok) {
			throw new Error("Failed to add task");
		}

		return await res.json();
	} catch (error) {
		console.error("Error adding task:", error);
		throw error;
	}
};
