import React from "react";
import { deleteTask } from "../../../../apis";
import { TaskActionType, TaskActions } from "../../task-context-type";
import { NotificationStatus } from "../../../notification-context";
import { Messages } from "../../../../constants";

export const deleteTaskAction = async (
	taskId: string,
	dispatch: React.Dispatch<TaskActionType>,
	showNotification: (message: string, type: NotificationStatus) => void
) => {
	dispatch({ type: TaskActions.DELETE_TASK });
	try {
		await deleteTask(taskId);
		dispatch({ type: TaskActions.DELETE_TASK_SUCCESS });
		showNotification(Messages.TaskDeleteSuccess, NotificationStatus.SUCCESS);
	} catch (error) {
		console.error("Error deleting task:", error);
		dispatch({ type: TaskActions.DELETE_TASK_FAILURE });
		showNotification(Messages.TaskDeleteFail, NotificationStatus.ERROR);
	}
};
