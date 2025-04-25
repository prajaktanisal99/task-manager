import { faGripVertical, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { TaskContext } from "../../context";
import { TaskType } from "../../types";
import { capitalizeFirstLetter, getFormattedDate } from "../../utils";
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
		document.querySelectorAll(".task-column-container").forEach((col) => {
			col.classList.remove("drag-over");
		});
	};

	const handleTaskDelete = async (taskId: string) => {
		await deleteTask(taskId);
		await getAllTasks();
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
						{capitalizeFirstLetter(task.priority)}
					</p>
				</div>
				<div className="task-card-actions">
					<div className="task-card-edit">
						<FontAwesomeIcon
							icon={faPen}
							size="xs"
							onClick={() => {
								setEditTask(true);
								setTaskToEdit(task);
								toggleAddTask();
							}}
						/>
					</div>
					<div className="task-card-delete">
						<FontAwesomeIcon
							onClick={() => handleTaskDelete(task._id)}
							icon={faTrash}
							size="xs"
						/>
					</div>
				</div>
			</div>

			<p className="task-card-title">{task.title}</p>
			<p className="task-card-description">{task.description}</p>
			<p className="task-card-date">{getFormattedDate(task?.dueDate)}</p>
			{showAddTask && <AddUpdateTask />}
		</div>
	);
};
