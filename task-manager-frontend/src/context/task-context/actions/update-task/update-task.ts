import { updateTask } from "../../../../apis";
import { Messages } from "../../../../constants";
import { TaskType, QueryParams } from "../../../../types";
import { NotificationStatus } from "../../../notification-context";
import { TaskActionType, TaskActions } from "../../task-context-type";

export const updateTaskAction = async (
	task: TaskType,
	dispatch: React.Dispatch<TaskActionType>,
	query: QueryParams = {},
	showNotification: (message: string, type: NotificationStatus) => void
) => {
	try {
		dispatch({ type: TaskActions.UPDATE_TASK });
		await updateTask(task, query);
		dispatch({
			type: TaskActions.UPDATE_TASK_SUCCESS,
		});
		showNotification(Messages.TaskUpdateSuccess, NotificationStatus.SUCCESS);
	} catch (error) {
		console.error(error);
		dispatch({
			type: TaskActions.UPDATE_TASK_FAILURE,
		});
		showNotification(Messages.TaskUpdateFail, NotificationStatus.ERROR);
	}
};
