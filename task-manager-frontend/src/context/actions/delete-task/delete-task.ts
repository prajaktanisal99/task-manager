import React from "react";
import { TaskActions, TaskActionType } from "../../task-context";
import { deleteTask } from "../../../apis";

export const deleteTaskAction = async (taskId: string, dispatch: React.Dispatch<TaskActionType>) => {
	dispatch({ type: TaskActions.DELETE_TASK });
	try {
		await deleteTask(taskId);
		dispatch({ type: TaskActions.DELETE_TASK_SUCCESS });
	} catch (error: any) {
		console.error("Error deleting task:", error);
		dispatch({ type: TaskActions.DELETE_TASK_FAILURE });
	}
};
