import { TaskPriority, TaskColumnType } from "../../types";

export const getFilteredTasks = (
	columns: Array<TaskColumnType>,
	searchKey: string,
	priority: TaskPriority,
	dueByDate?: string
): Array<TaskColumnType> => {
	const regex = new RegExp(searchKey, "i");

	const dueBy = dueByDate ? new Date(dueByDate + "T00:00:00Z") : null;

	const filteredTasks = columns.map((column) => {
		const filteredTask = column?.tasks?.filter((task) => {
			const matchesPriority = priority === task.priority || priority === TaskPriority.ALL;

			const matchesSearch = regex.test(task?.title) || regex.test(task?.description);

			const taskDueDate = new Date(task?.dueDate);

			const matchesDueByDate = !dueBy || taskDueDate <= dueBy;

			return matchesPriority && matchesSearch && matchesDueByDate;
		});
		return {
			...column,
			tasks: filteredTask,
			// IMPLEMENTED DURING INTERVIEW - Sort by date(ascending order)
			// 	.sort((task1, task2) => {
			// 	if (task1?.dueDate < task2?.dueDate) {
			// 		return -1;
			// 	} else if (task1?.dueDate > task2?.dueDate) {
			// 		return 1;
			// 	} else {
			// 		return 0;
			// 	}
			// }),
		};
	});

	return filteredTasks;
};
