import type { Request, Response, NextFunction } from "express";
import { TaskUpdateAction } from "../../../../constants/index.ts";

export const validateUpdateAction = (req: Request, res: Response): void => {
	const action = req?.query?.action as string;

	if (!action) {
		res.status(400).json({
			status: false,
			message: "Action query parameter is required",
		});
	}

	if (!Object.values(TaskUpdateAction).includes(action)) {
		res.status(400).json({
			status: false,
			message: `Invalid action. Must be one of: ${Object.values(TaskUpdateAction).join(", ")}`,
		});
	}
};
