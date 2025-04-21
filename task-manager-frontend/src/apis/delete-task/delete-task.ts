export const deleteTask = async (taskId: string): Promise<void> => {
	try {
		const res = await fetch(
			`http://localhost:3001/tasks/${taskId}`,
			{
				method: "DELETE",
			}
		);

		if (!res.ok) {
			console.error("Failed to delete task:", res.statusText);
			throw new Error("Failed to delete task");
		}
	} catch (error) {
		throw new Error("Error deleting task");
	}
};
