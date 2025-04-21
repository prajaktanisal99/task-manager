import { useContext, useEffect } from "react";

import { TaskColumn } from "./task-column";
import { TaskActionBar } from "./task-action-bar";
import { getFilteredTasks } from "../utils";
import { AddUpdateTask } from "./add-update-task";
import { TaskContext } from "../context";

export const TaskBoard = () => {
	const { isFetchingTasks, columns, searchKey, selectedPriority, showAddTask, getAllTasks } =
		useContext(TaskContext);

	useEffect(() => {
		const loadData = async () => {
			await getAllTasks();
		};

		loadData();
	}, []);

	if (isFetchingTasks) {
		<div>Loading</div>;
	}

	return (
		<div className="task-board-container">
			<h1 className="task-board-title">Task Board</h1>
			<TaskActionBar />
			<div className="task-board">
				{getFilteredTasks(searchKey, selectedPriority, columns).map((column) => (
					<TaskColumn key={column.id} column={column} />
				))}
			</div>
			{showAddTask && <AddUpdateTask />}
		</div>
	);
};
