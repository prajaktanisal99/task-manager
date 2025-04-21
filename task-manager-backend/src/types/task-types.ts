export const TaskStatus = {
	TODO: "todo",
	IN_PROGRESS: "inProgress",
	DONE: "done",
} as const;

export const TaskPriority = {
	HIGH: "high",
	MEDIUM: "medium",
	LOW: "low",
} as const;

export type TaskStatusType = (typeof TaskStatus)[keyof typeof TaskStatus];
export type TaskPriorityType = (typeof TaskPriority)[keyof typeof TaskPriority];

export interface TaskRequestType {
	_id: string;
	title: string;
	description: string;
	priority: TaskPriorityType;
	status?: TaskStatusType;
	dueDate: Date;
}
