// task-context/actions/addTaskAction.ts
import { TaskActions, TaskActionType } from "../..";
import { addTask } from "../../../apis";
import { TaskType } from "../../../types";

export const addTaskAction = async (task: TaskType, dispatch: React.Dispatch<TaskActionType>) => {
	try {
		dispatch({ type: TaskActions.ADD_NEW_TASK });
		const createdTask: TaskType = await addTask(task);

		dispatch({
			type: TaskActions.ADD_NEW_TASK_SUCCESS,
			payload: createdTask,
		});
	} catch (error) {
		console.error(error);
		dispatch({
			type: TaskActions.ADD_NEW_TASK_FAILURE,
			payload: "Failed to add task",
		});
	}
};
