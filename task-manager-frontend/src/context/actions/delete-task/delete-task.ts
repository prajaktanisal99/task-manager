import React from "react";
import { deleteTask } from "../../../apis";
import { TaskActionType, TaskActions } from "../../task-context-type";

export const deleteTaskAction = async (taskId: string, dispatch: React.Dispatch<TaskActionType>) => {
	dispatch({ type: TaskActions.DELETE_TASK });
	try {
		await deleteTask(taskId);
		dispatch({ type: TaskActions.DELETE_TASK_SUCCESS });
	} catch (error) {
		console.error("Error deleting task:", error);
		dispatch({ type: TaskActions.DELETE_TASK_FAILURE });
	}
};
