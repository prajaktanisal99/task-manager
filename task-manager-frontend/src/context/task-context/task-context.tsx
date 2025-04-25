import { createContext, useReducer } from "react";
import { QueryParams, TaskColumnType, TaskPriority, TaskType } from "../../types";
import { taskReducer } from "../../reducer";
import { addTaskAction, updateTaskAction, getAllTasksAction, deleteTaskAction } from "./actions";
import { TaskContextType, TaskActions } from "./task-context-type";
import { initialTaskState } from "./task-context-constants";
import { useNotification } from "../notification-context";

export const TaskContext = createContext<TaskContextType>({} as TaskContextType);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
	const [state, dispatch] = useReducer(taskReducer, initialTaskState);
	const { showNotification } = useNotification();

	// Actions
	const addNewTask = (task: TaskType) => addTaskAction(task, dispatch, showNotification);
	const getAllTasks = () => getAllTasksAction(dispatch, showNotification);
	const updateTask = (task: TaskType, query: QueryParams) =>
		updateTaskAction(task, dispatch, query, showNotification);
	const deleteTask = (taskId: string) => deleteTaskAction(taskId, dispatch, showNotification);

	const setColumns = (columns: Array<TaskColumnType>) => {
		dispatch({ type: TaskActions.SET_COLUMNS, payload: columns });
	};
	const setSelectedPriority = (priority: TaskPriority) => {
		dispatch({
			type: TaskActions.SET_SELECTED_PRIORITY,
			payload: priority,
		});
	};
	const setSearchKey = (searchKey: string) => {
		dispatch({
			type: TaskActions.SET_SEARCH_KEY,
			payload: searchKey,
		});
	};
	const toggleAddTask = () => {
		dispatch({ type: TaskActions.TOGGLE_ADD_TASK });
	};
	const setEditTask = (editTask: boolean) => {
		dispatch({ type: TaskActions.SET_EDIT_TASK, payload: editTask });
	};
	const setTaskToEdit = (task?: TaskType) => {
		dispatch({ type: TaskActions.SET_TASK_TO_EDIT, payload: task });
	};
	const setDueByDate = (dueByDate?: string) => {
		dispatch({ type: TaskActions.SET_DUE_BY_DATE, payload: dueByDate });
	};

	return (
		<TaskContext.Provider
			value={{
				dueByDate: state?.dueByDate,
				isFetchingTasks: state?.isFetchingTasks,
				columns: state.columns,
				selectedPriority: state.selectedPriority,
				searchKey: state.searchKey,
				showAddTask: state.showAddTask,
				editTask: state.editTask,
				taskToEdit: state.taskToEdit,
				addNewTask,
				setColumns,
				setSelectedPriority,
				setSearchKey,
				toggleAddTask,
				setEditTask,
				setTaskToEdit,
				setDueByDate,
				getAllTasks,
				updateTask,
				deleteTask,
			}}
		>
			{children}
		</TaskContext.Provider>
	);
};
