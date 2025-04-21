import { TaskColumnType, TaskPriority } from "../types";

export const TASKS: Array<TaskColumnType> = [
	{
		id: "toDo",
		title: "To Do",
		tasks: [
			{
				id: "task11",
				title: "Create API",
				description: "Create API",
				dueDate: new Date(),
				priority: TaskPriority.HIGH,
			},
			{
				id: "task12",
				title: "Add responsiveness",
				description: "Add responsiveness",
				dueDate: new Date(),
				priority: TaskPriority.MEDIUM,
			},
			{
				id: "task13",
				title: "Design Database",
				description: "Design Database",
				dueDate: new Date(),
				priority: TaskPriority.HIGH,
			},
		],
	},
	{
		id: "inProgress",
		title: "In Progress",
		tasks: [
			{
				id: "task21",
				title: "Code Refactor",
				description: "code refactor",
				dueDate: new Date(),
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
