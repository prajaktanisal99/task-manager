import { useContext, useEffect, useState } from "react";
import { TaskPriority, TaskStatus, TaskType, TaskUpdateAction } from "../../types";

import { TaskContext } from "../../context";

export const AddUpdateTask = () => {
	const { editTask, taskToEdit, toggleAddTask, addNewTask, updateTask, getAllTasks } = useContext(TaskContext);

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [priority, setPriority] = useState<TaskPriority>(TaskPriority.LOW);
	const [dueDate, setDueDate] = useState<string>(new Date().toISOString().split("T")[0]);

	useEffect(() => {
		if (editTask && taskToEdit) {
			setTitle(taskToEdit?.title || "");
			setDescription(taskToEdit?.description);
			setPriority(taskToEdit?.priority);
			setDueDate(taskToEdit?.dueDate?.split("T")[0] ?? dueDate);
		}
	}, []);

	const handleSubmit = async () => {
		const taskData: TaskType = {
			_id: editTask ? (taskToEdit?._id ?? "") : "",
			title,
			description,
			priority,
			dueDate,
			status: editTask ? taskToEdit?.status : TaskStatus.TO_DO,
		};

		if (editTask) {
			await updateTask(taskData, { action: TaskUpdateAction.EDIT });
		} else {
			await addNewTask(taskData);
		}
		toggleAddTask();
		await getAllTasks();
	};

	return (
		<div className="add-task-container">
			<div className="add-task-content">
				<h2 className="add-task-header">{editTask ? "Edit Task" : "Add Task"}</h2>

				<div className="add-task-title">
					<label className="add-task-label">Title</label>
					<input
						placeholder="Title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>

				<div className="add-task-description">
					<label className="add-task-label">Description</label>
					<textarea
						placeholder="Description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>

				<div className="add-task-priority-date">
					<div className="add-task-priority">
						<label className="add-task-label">Priority</label>
						<select
							value={priority}
							onChange={(e) => setPriority(e.target.value as TaskPriority)}
						>
							<option value={TaskPriority.LOW}>Low</option>
							<option value={TaskPriority.MEDIUM}>Medium</option>
							<option value={TaskPriority.HIGH}>High</option>
						</select>
					</div>

					<div className="add-task-date">
						<label className="add-task-label">Due Date</label>
						<input
							id="due-date"
							type="date"
							min={new Date().toISOString().split("T")[0]}
							value={dueDate || new Date().toISOString().split("T")[0]}
							placeholder="Due Date"
							onChange={(e) => setDueDate(e.target.value)}
						/>
					</div>
				</div>

				<div className="add-task-action-buttons">
					<button className="add-task-button-cancel" onClick={() => toggleAddTask()}>
						Cancel
					</button>
					<button
						// IMPLEMENTED DURING INTERVIEW - disable save when no title
						disabled={!title}
						className="add-task-button-save"
						onClick={handleSubmit}
					>
						Save
					</button>
				</div>
			</div>
		</div>
	);
};
