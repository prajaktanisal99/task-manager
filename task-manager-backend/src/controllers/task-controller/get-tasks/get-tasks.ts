import type { Request, Response } from "express";

import { Task } from "../../../models/index.ts";
import { logger } from "../../../utils/index.ts";

export const getTasks = async (req: Request, res: Response): Promise<any> => {
	try {
		const tasks = await Task.find();

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
