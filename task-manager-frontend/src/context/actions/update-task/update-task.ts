import { updateTask } from "../../../apis";
import { QueryParams, TaskType } from "../../../types";
import { TaskActionType, TaskActions } from "../../task-context-type";

export const updateTaskAction = async (
	task: TaskType,
	dispatch: React.Dispatch<TaskActionType>,
	query: QueryParams = {}
) => {
	try {
		dispatch({ type: TaskActions.UPDATE_TASK });

		const updatedTask = await updateTask(task, query);
		console.log(updatedTask);
		dispatch({
			type: TaskActions.UPDATE_TASK_SUCCESS,
		});
	} catch (error) {
		console.error(error);
		dispatch({
			type: TaskActions.UPDATE_TASK_FAILURE,
		});
	}
};
