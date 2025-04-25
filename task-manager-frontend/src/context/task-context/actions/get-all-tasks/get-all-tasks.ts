import { getTasks } from "../../../../apis";
import { Messages } from "../../../../constants";
import { TaskColumnType } from "../../../../types";
import { NotificationStatus } from "../../../notification-context";
import { TaskActions, TaskActionType } from "../../task-context-type";

export const getAllTasksAction = async (
	dispatch: React.Dispatch<TaskActionType>,
	showNotification: (message: string, type: NotificationStatus) => void
) => {
	try {
		dispatch({ type: TaskActions.GET_ALL_TASKS });
		const columns: Array<TaskColumnType> = await getTasks();

		dispatch({
			type: TaskActions.GET_ALL_TASKS_SUCCESS,
			payload: columns,
		});
	} catch (error) {
		console.error(error);
		dispatch({
			type: TaskActions.GET_ALL_TASKS_FAILURE,
		});
		showNotification(Messages.TaskFetchFail, NotificationStatus.ERROR);
	}
};
