import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String },
	priority: {
		type: String,
		enum: ["low", "medium", "high"],
		default: "low",
	},
	status: {
		type: String,
		enum: ["todo", "inProgress", "done"],
		default: "todo",
	},
	dueDate: { type: Date, default: Date.now },
	order: { type: Number, required: true },
});

export const Task = mongoose.model("Task", taskSchema);
