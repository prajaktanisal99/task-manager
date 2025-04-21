import { TaskActions, TaskActionType } from "../context";
import { TaskState } from "../types";

export const taskReducer = (state: TaskState, action: TaskActionType) => {
	switch (action.type) {
		case TaskActions.SET_COLUMNS:
			return {
				...state,
				columns: action.payload,
			};
		case TaskActions.SET_SELECTED_PRIORITY:
			return {
				...state,
				selectedPriority: action.payload,
			};
		case TaskActions.SET_SEARCH_KEY:
			return {
				...state,
				searchKey: action.payload,
			};
		case TaskActions.TOGGLE_ADD_TASK:
			return {
				...state,
				showAddTask: !state.showAddTask,
			};
		case TaskActions.SET_EDIT_TASK:
			return {
				...state,
				editTask: action.payload,
			};
		case TaskActions.SET_TASK_TO_EDIT:
			return {
				...state,
				taskToEdit: action.payload,
			};
		case TaskActions.GET_ALL_TASKS:
		case TaskActions.ADD_NEW_TASK:
		case TaskActions.UPDATE_TASK:
		case TaskActions.DELETE_TASK:
			return {
				...state,
				isFetchingTasks: true,
			};

		case TaskActions.GET_ALL_TASKS_SUCCESS:
			return {
				...state,
				isFetchinTasks: false,
				columns: action.payload,
			};
		case TaskActions.GET_ALL_TASKS_FAILURE:
		case TaskActions.ADD_NEW_TASK_SUCCESS:
		case TaskActions.ADD_NEW_TASK_FAILURE:
		case TaskActions.DELETE_TASK_SUCCESS:
		case TaskActions.DELETE_TASK_FAILURE:
		case TaskActions.UPDATE_TASK_SUCCESS:
		case TaskActions.UPDATE_TASK_FAILURE:
			return {
				...state,
				isFetchingTasks: false,
			};
		default:
			return state;
	}
};
