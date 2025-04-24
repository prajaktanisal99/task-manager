import { BASE_URL } from "../../constants";

export const deleteTask = async (taskId: string): Promise<void> => {
	try {
		const url = `${BASE_URL}/tasks/${taskId}`;
		const res = await fetch(url, {
			method: "DELETE",
		});

		if (!res.ok) {
			console.error("Failed to delete task:", res.statusText);
			throw new Error("Failed to delete task");
		}
	} catch (error) {
		console.error("Error deleting task ", error);
		throw error;
	}
};
