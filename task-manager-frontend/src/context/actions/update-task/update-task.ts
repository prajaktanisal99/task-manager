import { updateTask } from "../../../apis";
import { QueryParams, TaskType } from "../../../types";
import { TaskActionType, TaskActions } from "../../task-context";

export const updateTaskAction = async (
	task: TaskType,
	dispatch: React.Dispatch<TaskActionType>,
	query: QueryParams = {}
) => {
	try {
		dispatch({ type: TaskActions.UPDATE_TASK });

		const updatedTask = await updateTask(task, query);
		dispatch({
			type: TaskActions.UPDATE_TASK_SUCCESS,
		});
	} catch (error: any) {
		dispatch({
			type: TaskActions.UPDATE_TASK_FAILURE,
		});
	}
};
