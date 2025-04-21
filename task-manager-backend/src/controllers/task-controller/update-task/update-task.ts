import type { Request, Response } from "express";
import { Task } from "../../../models/index.ts";
import { logger } from "../../../utils/index.ts";
import type { TaskRequestType } from "../../../types/index.ts";

export const updateTask = async (req: Request, res: Response): Promise<any> => {
	try {
		const taskId = req.params.id;
		const updatePayload: TaskRequestType = req.body;

		logger.info(`Received request to update task ID: ${taskId}`);
		logger.debug(`Payload: ${JSON.stringify(updatePayload)}`);

		if (!taskId) {
			return res.status(400).json({
				status: false,
				message: "Task ID is required.",
			});
		}

		if (!updatePayload?.title) {
			return res.status(400).json({ status: false, message: "Bad Request. Title missing." });
		}

		const updatedTask = await Task.findByIdAndUpdate(taskId, updatePayload, { new: true });

		if (!updatedTask) {
			logger.warn(`Task with ID ${taskId} not found`);
			return res.status(404).json({
				status: false,
				message: "Task not found.",
			});
		}

		logger.info(`Task updated: ${updatedTask.title}`);
		return res.status(200).json({
			status: true,
			message: "Task updated successfully.",
			data: updatedTask,
		});
	} catch (error) {
		logger.error(`Error updating task: ${(error as Error).message}`);
		return res.status(500).json({
			status: false,
			message: "Internal Server Error.",
		});
	}
};
