import { createContext, useReducer } from "react";
import { QueryParams, TaskColumnType, TaskPriority, TaskState, TaskType } from "../types";
import { taskReducer } from "../reducer";
import { addTaskAction, updateTaskAction, getAllTasksAction, deleteTaskAction } from "./actions";

export enum TaskActions {
	SET_COLUMNS = "SET_COLUMNS",
	SET_SELECTED_PRIORITY = "SET_SELECTED_PRIORITY",
	SET_SEARCH_KEY = "SET_SEARCH_KEY",
	TOGGLE_ADD_TASK = "TOGGLE_ADD_TASK",
	SET_EDIT_TASK = "SET_EDIT_TASK",
	SET_TASK_TO_EDIT = "SET_TASK_TO_EDIT",

	ADD_NEW_TASK = "ADD_NEW_TASK",
	ADD_NEW_TASK_SUCCESS = "ADD_NEW_TASK_SUCCESS",
	ADD_NEW_TASK_FAILURE = "ADD_NEW_TASK_FAILURE",

	DELETE_TASK = "DELETE_TASK",
	DELETE_TASK_SUCCESS = "DELETE_TASK_SUCCESS",
	DELETE_TASK_FAILURE = "DELETE_TASK_FAILURE",

	UPDATE_TASK = "UPDATE_TASK",
	UPDATE_TASK_SUCCESS = "UPDATE_TASK_SUCCESS",
	UPDATE_TASK_FAILURE = "UPDATE_TASK_FAILURE",

	GET_ALL_TASKS = "GET_ALL_TASKS",
	GET_ALL_TASKS_SUCCESS = "GET_ALL_TASKS_SUCCESS",
	GET_ALL_TASKS_FAILURE = "GET_ALL_TASKS_FAILURE",
}

export type TaskActionType =
	| { type: TaskActions.SET_COLUMNS; payload: Array<TaskColumnType> }
	| { type: TaskActions.SET_SELECTED_PRIORITY; payload: TaskPriority }
	| { type: TaskActions.SET_SEARCH_KEY; payload: string }
	| { type: TaskActions.TOGGLE_ADD_TASK }
	| { type: TaskActions.SET_EDIT_TASK; payload: boolean }
	| { type: TaskActions.SET_TASK_TO_EDIT; payload?: TaskType }
	| { type: TaskActions.ADD_NEW_TASK }
	| { type: TaskActions.ADD_NEW_TASK_SUCCESS; payload: TaskType }
	| { type: TaskActions.ADD_NEW_TASK_FAILURE; payload: string }
	| { type: TaskActions.DELETE_TASK }
	| { type: TaskActions.DELETE_TASK_SUCCESS }
	| { type: TaskActions.DELETE_TASK_FAILURE }
	| { type: TaskActions.UPDATE_TASK }
	| { type: TaskActions.UPDATE_TASK_SUCCESS }
	| { type: TaskActions.UPDATE_TASK_FAILURE }
	| { type: TaskActions.GET_ALL_TASKS }
	| { type: TaskActions.GET_ALL_TASKS_SUCCESS; payload: Array<TaskColumnType> }
	| { type: TaskActions.GET_ALL_TASKS_FAILURE };

interface TaskContextType {
	isFetchingTasks: boolean;
	columns: Array<TaskColumnType>;
	selectedPriority: TaskPriority;
	searchKey: string;
	showAddTask: boolean;
	editTask: boolean;
	taskToEdit?: TaskType;
	setColumns: (columns: Array<TaskColumnType>) => void;
	setSelectedPriority: (priority: TaskPriority) => void;
	setSearchKey: (searchKey: string) => void;
	toggleAddTask: () => void;
	setEditTask: (editTask: boolean) => void;
	setTaskToEdit: (task?: TaskType) => void;
	getAllTasks: () => Promise<void>;
	addNewTask: (task: TaskType) => Promise<void>;
	updateTask: (task: TaskType, query: QueryParams) => Promise<void>;
	deleteTask: (taskId: string) => Promise<void>;
}

export const TaskContext = createContext<TaskContextType>({} as TaskContextType);

export const initialTaskState: TaskState = {
	columns: [],
	isFetchingTasks: false,
	selectedPriority: TaskPriority.ALL,
	searchKey: "",
	showAddTask: false,
	editTask: false,
	taskToEdit: undefined,
};

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
	const [state, dispatch] = useReducer(taskReducer, initialTaskState);

	// Actions
	const addNewTask = (task: TaskType) => addTaskAction(task, dispatch);
	const getAllTasks = () => getAllTasksAction(dispatch);
	const updateTask = (task: TaskType, query: QueryParams) => updateTaskAction(task, dispatch, query);
	const deleteTask = (taskId: string) => deleteTaskAction(taskId, dispatch);

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

	return (
		<TaskContext.Provider
			value={{
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
				getAllTasks,
				updateTask,
				deleteTask,
			}}
		>
			{children}
		</TaskContext.Provider>
	);
};
