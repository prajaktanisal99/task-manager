import { TaskRequestType } from "../../types";

export const addTask = async (newTask: TaskRequestType) => {
	const url = "http://localhost:3001/tasks";
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
