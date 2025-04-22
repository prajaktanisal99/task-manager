import { getTasks } from "../../../apis";
import { TaskColumnType } from "../../../types";
import { TaskActions, TaskActionType } from "../../task-context-type";

export const getAllTasksAction = async (dispatch: React.Dispatch<TaskActionType>) => {
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
	}
};
