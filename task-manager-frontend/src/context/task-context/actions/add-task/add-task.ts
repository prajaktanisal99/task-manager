import { NotificationStatus, TaskActions, TaskActionType } from "../../..";
import { addTask } from "../../../../apis";
import { Messages } from "../../../../constants";
import { TaskType } from "../../../../types";

export const addTaskAction = async (
	task: TaskType,
	dispatch: React.Dispatch<TaskActionType>,
	showNotification: (message: string, type: NotificationStatus) => void
) => {
	try {
		dispatch({ type: TaskActions.ADD_NEW_TASK });
		const createdTask: TaskType = await addTask(task);

		dispatch({
			type: TaskActions.ADD_NEW_TASK_SUCCESS,
			payload: createdTask,
		});
		showNotification(Messages.TaskCreateSuccess, NotificationStatus.SUCCESS);
	} catch (error) {
		console.error(error);
		dispatch({
			type: TaskActions.ADD_NEW_TASK_FAILURE,
			payload: "Failed to add task",
		});
		showNotification(Messages.TaskCreateFail, NotificationStatus.ERROR);
	}
};
