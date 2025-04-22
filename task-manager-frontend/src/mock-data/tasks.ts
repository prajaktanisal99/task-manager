import { TaskColumnType, TaskPriority, TaskStatus } from "../types";

export const TASKS: Array<TaskColumnType> = [
	{
		id: TaskStatus.TO_DO,
		title: "To Do",
		tasks: [
			{
				_id: "task11",
				title: "Create API",
				description: "Create API",
				dueDate: new Date().toISOString(),
				priority: TaskPriority.HIGH,
			},
			{
				_id: "task12",
				title: "Add responsiveness",
				description: "Add responsiveness",
				dueDate: new Date().toISOString(),
				priority: TaskPriority.MEDIUM,
			},
			{
				_id: "task13",
				title: "Design Database",
				description: "Design Database",
				dueDate: new Date().toISOString(),
				priority: TaskPriority.HIGH,
			},
		],
	},
	{
		id: TaskStatus.IN_PROGRESS,
		title: "In Progress",
		tasks: [
			{
				_id: "task21",
				title: "Code Refactor",
				description: "code refactor",
				dueDate: new Date().toISOString(),
				priority: TaskPriority.LOW,
			},
			{
				id: "task22",
				title: "Add types",
				description: "Add types",
				dueDate: new Date(),
				priority: TaskPriority.LOW,
			},
		],
	},
	{
		id: "done",
		title: "Done",
		tasks: [
			{
				id: "task31",
				title: "Basic Design",
				description: "Basic Design",
				dueDate: new Date(),
				priority: TaskPriority.HIGH,
			},
			{
				id: "task32",
				title: "Drag and Drop across column",
				description: "drag and drop",
				dueDate: new Date(),
				priority: TaskPriority.MEDIUM,
			},
		],
	},
];
