import { TaskContext } from "../../context/task-context/task-context";

import { useContext } from "react";
import { TaskPriority } from "../../types";

export const TaskActionBar = () => {
	const {
		dueByDate,
		searchKey,
		setSearchKey,
		selectedPriority,
		setEditTask,
		setSelectedPriority,
		toggleAddTask,
		setDueByDate,
	} = useContext(TaskContext);

	return (
		<div className="task-action-bar">
			<input
				className="task-action-search"
				placeholder="Search Tasks"
				value={searchKey}
				onChange={(e) => setSearchKey(e.target.value)}
			></input>

			<div className="task-action-buttons">
				<div className="task-action-dates-priority">
					<div className="task-action-dates">
						<div className="task-action-dates-label">
							<label>Due by</label>
						</div>
						<div>
							<input
								type="date"
								value={dueByDate}
								onChange={(e) => setDueByDate(e.target.value)}
							/>
						</div>
					</div>
					<select
						className="task-action-priority"
						value={selectedPriority}
						onChange={(e) => setSelectedPriority(e.target.value as TaskPriority)}
					>
						<option value={TaskPriority.ALL}>All Priorities</option>
						<option value={TaskPriority.LOW}>Low</option>
						<option value={TaskPriority.MEDIUM}>Medium</option>
						<option value={TaskPriority.HIGH}>High</option>
					</select>
				</div>
				<button
					className="add-task-button"
					onClick={() => {
						setEditTask(false);
						toggleAddTask();
					}}
				>
					+ Add Task
				</button>
			</div>
		</div>
	);
};
