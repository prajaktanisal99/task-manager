// task-context/actions/addTaskAction.ts
import { addTask } from "../../../apis";
import { TaskType } from "../../../types";
import { TaskActionType, TaskActions } from "../../task-context";

export const addTaskAction = async (task: TaskType, dispatch: React.Dispatch<TaskActionType>) => {
	try {
		dispatch({ type: TaskActions.ADD_NEW_TASK });
		const createdTask: TaskType = await addTask(task);

		dispatch({
			type: TaskActions.ADD_NEW_TASK_SUCCESS,
			payload: createdTask,
		});
	} catch (error: any) {
		dispatch({
			type: TaskActions.ADD_NEW_TASK_FAILURE,
			payload: error.message || "Failed to add task",
		});
	}
};
