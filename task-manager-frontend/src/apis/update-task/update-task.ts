import { TaskRequestType } from "../../types";

export const updateTask = async (taskData: TaskRequestType) => {
	const url = `http://localhost:3001/tasks/${taskData._id}`;
	try {
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
		console.error("Error updating task:", error);
		throw error;
	}
};
