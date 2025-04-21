import { useContext } from "react";
import { TaskColumnType, TaskRequestType } from "../types";
import { TaskCard } from "./task-card";
import { TaskContext } from "../context";

interface TaskColumnProps {
	column: TaskColumnType;
}

export const TaskColumn = ({ column }: TaskColumnProps) => {
	const { columns, setColumns, updateTask } = useContext(TaskContext);

	const dropHandler = (ev: React.DragEvent) => {
		ev.preventDefault();
		const taskId = ev.dataTransfer.getData("taskId");
		const fromColumnId = ev.dataTransfer.getData("columnId");

		if (!taskId || !fromColumnId) return;

		const fromColumn = columns.find((col) => col.id === fromColumnId);
		const toColumn = columns.find((col) => col.id === column.id);
		if (!fromColumn || !toColumn) return;

		const task = fromColumn.tasks.find((t) => t._id === taskId);
		if (!task) return;

		// Remove task from original column
		const updatedFromTasks = fromColumn.tasks.filter((t) => t._id !== taskId);

		// Determine where to insert the task in the destination column
		const dropY = ev.clientY;
		const taskElements = Array.from(document.querySelectorAll(`#${column.id} .task-card-container`));

		let insertAt = toColumn.tasks.length;
		for (let i = 0; i < taskElements.length; i++) {
			const box = taskElements[i].getBoundingClientRect();
			if (dropY < box.top + box.height / 2) {
				insertAt = i;
				break;
			}
		}

		if (fromColumnId === column.id && insertAt > 0 && toColumn.tasks[insertAt - 1]?._id === taskId) {
			return;
		}

		const updatedToTasks = fromColumnId === toColumn.id ? updatedFromTasks.slice() : toColumn.tasks.slice();

		updatedToTasks.splice(insertAt, 0, task);

		const updatedColumns = columns.map((col) => {
			if (col.id === toColumn.id) {
				return { ...col, tasks: updatedToTasks };
			}
			if (col.id === fromColumn.id) {
				return { ...col, tasks: updatedFromTasks };
			}
			return col;
		});

		if (fromColumnId !== toColumn.id) {
			console.log("fromColumn", fromColumn.id);
			console.log("toColumn", toColumn.id);
			console.log("task", task);
			const newTask = { ...task, status: toColumn.id };
			updateTask(newTask as unknown as TaskRequestType);
		}
		setColumns(updatedColumns);
	};

	const dragOverHandler = (ev: React.DragEvent) => {
		ev.preventDefault();
		ev.dataTransfer.dropEffect = "move";
	};

	return (
		<div className="task-column-container" id={column.id} onDrop={dropHandler} onDragOver={dragOverHandler}>
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
