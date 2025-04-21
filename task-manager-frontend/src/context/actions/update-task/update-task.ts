import { updateTask } from "../../../apis";
import { TaskRequestType } from "../../../types";
import { TaskActionType, TaskActions } from "../../task-context";

export const updateTaskAction = async (task: TaskRequestType, dispatch: React.Dispatch<TaskActionType>) => {
	try {
		dispatch({ type: TaskActions.UPDATE_TASK });

		const updatedTask = await updateTask(task);
		console.log(updatedTask);
		dispatch({
			type: TaskActions.UPDATE_TASK_SUCCESS,
		});
	} catch (error: any) {
		dispatch({
			type: TaskActions.UPDATE_TASK_FAILURE,
		});
	}
};
