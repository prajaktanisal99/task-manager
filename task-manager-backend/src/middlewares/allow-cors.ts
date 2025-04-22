import type { NextFunction, Request, Response } from "express";
import cors from "cors";
import type { CorsOptions } from "cors";

const allowedOriginsEnv = process.env.ALLOWED_ORIGINS || "";
const allowedOriginsDev = allowedOriginsEnv
	.split(",")
	.map((origin) => origin.trim())
	.filter(Boolean);

if (process.env.NODE_ENV !== "production") {
	const devOrigins = ["http://localhost:5173"];
	devOrigins.forEach((devOrigin) => {
		if (!allowedOriginsDev.includes(devOrigin)) {
			allowedOriginsDev.push(devOrigin);
		}
	});
}

const corsOptions: CorsOptions = {
	origin: (origin, callback) => {
		if (!origin) {
			return callback(null, true);
		}

		if (allowedOriginsDev.indexOf(origin) === -1) {
			const message = `The CORS policy for this site does not allow access from the specified origin: ${origin}`;
			return callback(new Error(message), true);
		}

		return callback(null, true);
	},
	methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	allowedHeaders: ["Content-Type", "Authorization"],
	credentials: true,
};

export const configuredCORS = cors(corsOptions);
