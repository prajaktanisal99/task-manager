import type { Request, Response } from "express";
import { Task } from "../../../models/index.ts";
import { logger } from "../../../utils/index.ts";
import type { TaskRequestType } from "../../../types/index.ts";
import { ORDER_INCREMENT, TaskUpdateAction } from "../../../constants/index.ts";
import { validateUpdateAction } from "./utils/validate-update-action.ts";

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
			let newOrder: number;
			let prevTaskId = updatePayload?.previousTaskId;
			let nextTaskId = updatePayload?.nextTaskId;
			if (!prevTaskId && !nextTaskId) {
				// No reordering needed
				newOrder = updatePayload?.order || ORDER_INCREMENT;
			} else if (!prevTaskId) {
				// Moving to start
				const nextTask = await Task.findById(nextTaskId);
				newOrder = nextTask?.order ? nextTask.order / 2 : ORDER_INCREMENT;
			} else if (!nextTaskId) {
				// Moving to end
				const prevTask = await Task.findById(prevTaskId);
				newOrder = prevTask?.order ? prevTask.order + ORDER_INCREMENT : ORDER_INCREMENT;
			} else {
				// Moving between tasks
				const [prevTask, nextTask] = await Promise.all([
					Task.findById(prevTaskId),
					Task.findById(nextTaskId),
				]);

				if (prevTask && nextTask) {
					newOrder = prevTask.order + (nextTask.order - prevTask.order) / 2;
				} else {
					newOrder = ORDER_INCREMENT;
				}
			}

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
