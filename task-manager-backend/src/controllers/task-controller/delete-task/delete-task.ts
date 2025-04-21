import type { Request, Response } from "express";

import { Task } from "../../../models/index.ts";
import { logger } from "../../../utils//index.ts";

export const deleteTask = async (req: Request, res: Response): Promise<any> => {
	try {
		const { id } = req.params;

		const task = await Task.findById(id);
		if (!task) {
			logger.warn(`Task not found: ${id}`);
			return res.status(404).json({
				status: false,
				message: "Task not found.",
			});
		}

		await Task.findByIdAndDelete(id);

		logger.info(`Task deleted: ${id}`);
		return res.status(200).json({
			status: true,
			message: "Task deleted successfully.",
		});
	} catch (error) {
		logger.error("Error deleting task");
		return res.status(500).json({
			status: false,
			message: "Internal Server error.",
		});
	}
};
