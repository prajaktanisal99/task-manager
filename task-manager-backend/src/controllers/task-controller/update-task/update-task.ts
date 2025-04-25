import type { Request, Response } from "express";
import { Task } from "../../../models/index.js";
import { logger } from "../../../utils/index.js";
import type { TaskRequestType } from "../../../types/index.js";
import { TaskUpdateAction } from "../../../constants/index.js";
import { validateUpdateAction } from "./utils/validate-update-action.js";
import { getOrder } from "./utils/get-order.js";

export const updateTask = async (req: Request, res: Response): Promise<any> => {
	try {
		validateUpdateAction(req, res);

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

		let payload;

		if (req?.query?.action === TaskUpdateAction.EDIT) {
			payload = { ...updatePayload };
		} else {
			const newOrder = await getOrder(
				updatePayload?.order,
				updatePayload?.previousTaskId,
				updatePayload?.nextTaskId
			);
			payload = { ...updatePayload, order: newOrder };
		}

		const updatedTask = await Task.findByIdAndUpdate(
			taskId,
			{ ...payload },
			{
				new: true,
			}
		);
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
