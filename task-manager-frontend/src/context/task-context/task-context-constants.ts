import { TaskState, TaskPriority } from "../../types";

export const initialTaskState: TaskState = {
	columns: [],
	isFetchingTasks: false,
	selectedPriority: TaskPriority.ALL,
	searchKey: "",
	showAddTask: false,
	editTask: false,
	taskToEdit: undefined,
	dueByDate: undefined,
};
