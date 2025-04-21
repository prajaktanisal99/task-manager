import React, { useContext } from "react";
import { TaskType } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { getFormattedDate } from "../utils";
import { TaskContext } from "../context";
import { AddUpdateTask } from "./add-update-task";

interface TaskCardProps {
	task: TaskType;
	columnId: string;
	index: number;
}

export const TaskCard = ({ task, columnId, index }: TaskCardProps) => {
	const { showAddTask, setEditTask, setTaskToEdit, toggleAddTask, deleteTask, getAllTasks } =
		useContext(TaskContext);

	const dragStartHandler = (ev: React.DragEvent) => {
		ev.dataTransfer.setData("taskId", task._id);
		ev.dataTransfer.setData("columnId", columnId);
		ev.dataTransfer.dropEffect = "move";
		ev.currentTarget.classList.add("dragging");
	};

	const dragEndHandler = (ev: React.DragEvent) => {
		ev.currentTarget.classList.remove("dragging");
	};

	const handleTaskDelete = async (taskId: string) => {
		deleteTask(taskId);
		getAllTasks();
	};

	return (
		<div
			data-index={index}
			className="task-card-container"
			draggable
			onDragStart={dragStartHandler}
			onDragEnd={dragEndHandler}
		>
			<div className="task-card-header">
				<div className="task-card-drag">
					<FontAwesomeIcon
						className="task-card-drag-icon"
						icon={faGripVertical}
						size="xs"
						style={{ fontWeight: 10 }}
					/>

					<p
						className={`task-card-priority task-card-priority-${task.priority.toLowerCase()}`}
					>
						{task.priority}
					</p>
				</div>
				<div className="task-card-actions">
					<FontAwesomeIcon
						className="task-card-edit"
						icon={faPen}
						size="xs"
						onClick={() => {
							setEditTask(true);
							setTaskToEdit(task);
							toggleAddTask();
						}}
					/>
					<FontAwesomeIcon
						onClick={() => handleTaskDelete(task._id)}
						className="task-card-delete"
						icon={faTrash}
						size="xs"
					/>
				</div>
			</div>

			<p className="task-card-title">{task.title}</p>
			<p className="task-card-description">{task.description}</p>
			<p className="task-card-date">{getFormattedDate(task?.dueDate)}</p>
			{showAddTask && <AddUpdateTask />}
		</div>
	);
};
