import mongoose from "mongoose";

// export enum TaskPriority {
// 	HIGH = "High",
// 	MEDIUM = "Medium",
// 	LOW = "Low",
// }

// export interface TaskType {
// 	id: string;
// 	title: string;
// 	description: string;
// 	priority: TaskPriority;
// 	date: Date;
// }

const taskSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String },
	priority: {
		type: String,
		enum: ["low", "medium", "high"],
		// required: true,
		default: "low",
	},
	status: {
		type: String,
		enum: ["todo", "inProgress", "done"],
		// required: true,
		default: "todo",
	},
	date: { type: Date, default: Date.now },
	order: Number,
});

export const Task = mongoose.model("Task", taskSchema);
