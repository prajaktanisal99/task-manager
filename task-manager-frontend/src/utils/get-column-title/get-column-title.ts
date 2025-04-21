import { TaskStatus } from "../../types";

export const getColumnTitle = (status: TaskStatus): string => {
	switch (status) {
		case TaskStatus.TO_DO:
			return "To Do";
		case TaskStatus.IN_PROGRESS:
			return "In Progress";
		case TaskStatus.DONE:
			return "Done";
		default:
			console.warn(`Unknown status: ${status}`);
			return "Unknown Status";
	}
};
