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

export enum TaskUpdateAction {
	REORDER = "reorder",
	EDIT = "edit",
}
export interface TaskType {
	_id: string;
	title: string;
	description: string;
	priority: TaskPriority;
	status?: TaskStatus;
	dueDate: string;
	order?: number;
	previousTaskId?: string;
	nextTaskId?: string;
}

export interface TaskColumnType {
	id: TaskStatus;
	title: string;
	tasks: Array<TaskType>;
}

export interface TaskState {
	isFetchingTasks: boolean;
	columns: Array<TaskColumnType>;
	selectedPriority: TaskPriority;
	searchKey: string;
	showAddTask: boolean;
	editTask: boolean;
	taskToEdit?: TaskType;
}
