import { TaskPriority, TaskColumnType } from "../../types";

export const getFilteredTasks = (
	searchKey: string,
	priority: TaskPriority,
	columns: Array<TaskColumnType>
): Array<TaskColumnType> => {
	const regex = new RegExp(searchKey, "i");
	const filteredTasks = columns.map((column) => {
		const filteredTask = column?.tasks?.filter((task) => {
			const matchesPriority =
				priority === task.priority ||
				priority === TaskPriority.ALL;
			const matchesSearch =
				regex.test(task?.title) ||
				regex.test(task?.description);
			return matchesPriority && matchesSearch ? task : null;
		});
		return { ...column, tasks: filteredTask };
	});

	return filteredTasks;
};
