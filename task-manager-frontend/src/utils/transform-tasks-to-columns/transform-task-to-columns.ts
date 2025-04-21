import { TaskResponseType, TaskColumnType, TaskStatus, TaskType, TaskPriority } from "../../types";
import { getColumnTitle } from "../get-column-title";

export const transformTasksToColumns = (tasks: Array<TaskResponseType>): Array<TaskColumnType> => {
	const tasksByStatus = new Map<TaskStatus, Array<TaskType>>();

	tasks.forEach((rawTask: TaskResponseType) => {
		const status = rawTask.status as TaskStatus;
		const priority = rawTask.priority as TaskPriority;

		if (!Object.values(TaskStatus).includes(status)) {
			console.warn(`Skipping task with unknown status: ${rawTask.status}`, rawTask);
			return;
		}

		if (!Object.values(TaskPriority).includes(priority)) {
			console.warn(`Skipping task with unknown priority: ${rawTask.priority}`, rawTask);
			return;
		}

		const task: TaskType = {
			_id: rawTask._id,
			title: rawTask.title,
			description: rawTask.description || "",
			priority,
			status,
			dueDate: rawTask?.date,
		};

		if (!tasksByStatus.has(status)) {
			tasksByStatus.set(status, []);
		}
		tasksByStatus.get(status)?.push(task);
	});

	const desiredStatusOrder: TaskStatus[] = [TaskStatus.TO_DO, TaskStatus.IN_PROGRESS, TaskStatus.DONE];

	const taskColumns: Array<TaskColumnType> = desiredStatusOrder.map((status) => ({
		id: status,
		title: getColumnTitle(status),
		tasks: tasksByStatus.get(status) || [],
	}));

	return taskColumns;
};
