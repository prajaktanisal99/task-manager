export enum TaskPriority {
	HIGH = "high",
	MEDIUM = "medium",
	LOW = "low",
	ALL = "all",
}

export enum TaskStatus {
	TO_DO = "todo",
	IN_PROGRESS = "inProgress",
	DONE = "done",
}

export interface TaskType {
	_id: string;
	title: string;
	description: string;
	priority: TaskPriority;
	status?: TaskStatus;
	dueDate: string;
}

export interface TaskRequestType {
	_id: string;
	title: string;
	description: string;
	priority: TaskPriority;
	status?: TaskStatus;
	dueDate: Date;
}

export interface TaskColumnType {
	id: TaskStatus;
	title: string;
	tasks: Array<TaskType>;
}

export interface TaskResponseType {
	_id: string;
	title: string;
	description: string;
	priority: TaskPriority;
	status: TaskStatus;
	date: string;
}

export interface TaskState {
	columns: Array<TaskColumnType>;
	selectedPriority: TaskPriority;
	searchKey: string;
	showAddTask: boolean;
	editTask: boolean;
	taskToEdit?: TaskType;
}
