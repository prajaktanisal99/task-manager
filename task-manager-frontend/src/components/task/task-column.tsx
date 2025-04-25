import { useContext } from "react";
import { TaskColumnType, TaskType, TaskUpdateAction } from "../../types";
import { TaskCard } from "./task-card";
import { TaskContext } from "../../context";

interface TaskColumnProps {
	column: TaskColumnType;
}

export const TaskColumn = ({ column }: TaskColumnProps) => {
	const { columns, updateTask, getAllTasks } = useContext(TaskContext);

	const dropHandler = async (ev: React.DragEvent) => {
		ev.preventDefault();
		const taskId = ev.dataTransfer.getData("taskId");
		const fromColumnId = ev.dataTransfer.getData("columnId");

		if (!taskId || !fromColumnId) return;

		const fromColumn = columns.find((col) => col.id === fromColumnId);
		const toColumn = columns.find((col) => col.id === column.id);
		if (!fromColumn || !toColumn) return;

		const task = fromColumn.tasks.find((t: TaskType) => t._id === taskId);
		if (!task) return;

		// Remove task from original column
		const updatedFromTasks = fromColumn.tasks.filter((t: TaskType) => t._id !== taskId);

		// Determine where to insert the task in the destination column
		const dropY = ev.clientY;
		const taskElements = Array.from(document.querySelectorAll(`#${column.id} .task-card-container`));

		let insertAt = toColumn.tasks.length;
		const currentIndex = fromColumn.tasks.findIndex((t: TaskType) => t._id == taskId);

		for (let i = 0; i < taskElements.length; i++) {
			const box = taskElements[i].getBoundingClientRect();
			if (dropY < box.top + box.height / 2) {
				insertAt = i;
				break;
			}
		}

		// Return early if the task is pulled down at the same index in same column
		if (fromColumnId === column.id && insertAt > 0 && toColumn.tasks[insertAt - 1]?._id === taskId) {
			return;
		}

		// Return early if the task is pulled up at the same index in same column
		if (fromColumnId === column.id && currentIndex === insertAt) {
			return;
		}

		const updatedToTasks = fromColumnId === toColumn.id ? updatedFromTasks.slice() : toColumn.tasks.slice();

		// User drops within same column but below it's original position
		if (fromColumnId === column.id && currentIndex < insertAt) {
			insertAt -= 1;
		}

		updatedToTasks.splice(insertAt, 0, task);
		const newTask = { ...task, status: toColumn.id };
		await updateTask(
			{
				...newTask,
				previousTaskId: updatedToTasks?.[insertAt - 1]?._id,
				nextTaskId: updatedToTasks?.[insertAt + 1]?._id,
			},
			{ action: TaskUpdateAction.REORDER }
		);
		await getAllTasks();
	};

	const dragOverHandler = (ev: React.DragEvent) => {
		ev.preventDefault();
		ev.dataTransfer.dropEffect = "move";
		const column = ev.currentTarget as HTMLElement;
		column.classList.add("drag-over");
	};

	const dragLeaveHandler = (ev: React.DragEvent) => {
		const column = ev.currentTarget as HTMLElement;
		column.classList.remove("drag-over");
	};

	return (
		<div
			className="task-column-container"
			id={column.id}
			onDrop={dropHandler}
			onDragOver={dragOverHandler}
			onDragLeave={dragLeaveHandler}
		>
			<p className="task-column-title">
				{column.title} <span className="task-column-count">({column?.tasks.length})</span>
			</p>
			<div className="task-column">
				{column.tasks.map((task, index) => (
					<TaskCard key={task._id} task={task} columnId={column?.id} index={index} />
				))}
			</div>
		</div>
	);
};
