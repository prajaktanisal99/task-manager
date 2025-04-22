import type { NextFunction, Request, Response } from "express";

const allowedOrigins = ["http://localhost:5173", "http://11.29.216.242:5173"];

export const allowCors = (req: Request, res: Response, next: NextFunction) => {
	const origin = req.headers.origin;

	// Always set CORS headers
	res.setHeader("Access-Control-Allow-Origin", origin && allowedOrigins.includes(origin) ? origin : "");

	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

	res.setHeader("Content-Type", "application/json");

	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

	// Important: must return here to prevent further execution
	if (req.method === "OPTIONS") {
		res.sendStatus(204);
	}

	next();
};
