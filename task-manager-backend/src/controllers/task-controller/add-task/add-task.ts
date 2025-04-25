import type { Request, Response } from "express";
import mongoose from "mongoose";

import { Task } from "../../../models/index.js";
import { TaskPriority, TaskStatus } from "../../../types/index.js";
import { logger } from "../../../utils/index.js";
import { ORDER_INCREMENT } from "../../../constants/index.js";

export const createTask = async (req: Request, res: Response): Promise<any> => {
	try {
		const { title, description, status, priority, dueDate } = req.body;

		if (!title || typeof title !== "string" || !title.trim()) {
			logger.error("Required Field : Title missing or invalid");
			return res.status(400).json({
				status: false,
				message: "Task title is required.",
			});
		}

		// Check for duplicate title (case-insensitive)
		// IMPLEMENTED DURING INTERVIEW - Do not save tasks with same description and title
		const existingTaskWithTitleCheck = await Task.findOne({
			title: { $regex: `^${title}$`, $options: "i" },
		});

		const existingTaskWithDescCheck = await Task.findOne({
			description: { $regex: `^${description.trim()}$`, $options: "i" },
		});

		if (existingTaskWithTitleCheck && existingTaskWithDescCheck) {
			logger.warn(`Duplicate task title: ${title}`);
			return res.status(409).json({
				status: false,
				message: "Task with the same title already exists.",
			});
		}

		const maxOrderTask = await Task.findOne({ status: status || TaskStatus.TODO }).sort({ order: -1 });

		const newTask = new Task({
			title: title.trim(),
			description: description?.trim() || "",
			status: status || TaskStatus.TODO,
			priority: priority || TaskPriority.LOW,
			dueDate: dueDate ? new Date(dueDate) : new Date(),
			order: (maxOrderTask?.order || 0) + ORDER_INCREMENT,
		});

		const savedTask = await newTask.save();
		logger.info(`Task created: ${savedTask.title}`);

		return res.status(201).json({
			status: true,
			message: "Task created successfully.",
			task: savedTask,
		});
	} catch (error) {
		if (error instanceof mongoose.Error.ValidationError) {
			return res.status(400).json({
				status: false,
				message: "Invalid task data.",
			});
		}

		logger.error("Task creation failed");
		return res.status(500).json({
			status: false,
			message: "Internal server error.",
		});
	}
};
