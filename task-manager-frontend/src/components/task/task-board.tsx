import { useContext, useEffect } from "react";

import { TaskColumn } from "./task-column";
import { TaskActionBar } from "./task-action-bar";
import { getFilteredTasks } from "../../utils";
import { AddUpdateTask } from "./add-update-task";
import { TaskContext } from "../../context";

export const TaskBoard = () => {
	const { isFetchingTasks, dueByDate, columns, searchKey, selectedPriority, showAddTask, getAllTasks } =
		useContext(TaskContext);

	useEffect(() => {
		const loadData = async () => {
			await getAllTasks();
		};

		loadData();
	}, []);

	return (
		<div>
			<div className="task-board-container">
				<h1 className="task-board-title">Task Board</h1>
				<TaskActionBar />
				{isFetchingTasks ? (
					<div>Loading...</div>
				) : (
					<div className="task-board-columns">
						{getFilteredTasks(columns, searchKey, selectedPriority, dueByDate).map(
							(column) => (
								<TaskColumn key={column.id} column={column} />
							)
						)}
					</div>
				)}
				{showAddTask && <AddUpdateTask />}
			</div>
		</div>
	);
};
