import type { Request, Response } from "express";

import { Task } from "../../../models/index.js";
import { logger } from "../../../utils/index.js";

export const getTasks = async (req: Request, res: Response): Promise<any> => {
	try {
		const tasks = await Task.find().sort({ order: 1 });
		logger.info(`Fetched ${tasks.length} task(s)`);
		return res.status(200).json(tasks);
	} catch (error) {
		logger.error("Error fetching tasks");
		return res.status(500).json({
			status: false,
			message: "Failed to fetch tasks.",
		});
	}
};
