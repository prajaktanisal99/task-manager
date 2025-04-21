type LogLevel = "info" | "trace" | "debug" | "error" | "warn";

const LogLevelOrder: Record<LogLevel, number> = {
	trace: 0,
	info: 1,
	debug: 2,
	warn: 3,
	error: 4,
};

let currentLogLevel: LogLevel = "trace";

export const setLogLevel = (level: LogLevel) => {
	currentLogLevel = level;
};

const formatMessage = (message: string, level: LogLevel): string => {
	const timestamp = new Date().toISOString();
	return `[${timestamp}] ${level.toUpperCase()} : ${message}`;
};

const shouldLog = (level: LogLevel): boolean => {
	return LogLevelOrder[level] >= LogLevelOrder[currentLogLevel];
};

export const logger = {
	info: (message: string) => {
		if (shouldLog("info")) {
			console.info(formatMessage(message, "info"));
		}
	},
	trace: (message: string) => {
		if (shouldLog("trace")) {
			console.trace(formatMessage(message, "trace"));
		}
	},
	error: (message: string) => {
		if (shouldLog("error")) {
			console.error(formatMessage(message, "error"));
		}
	},
	warn: (message: string) => {
		if (shouldLog("warn")) {
			console.warn(formatMessage(message, "warn"));
		}
	},
	debug: (message: string) => {
		if (shouldLog("debug")) {
			console.debug(formatMessage(message, "debug"));
		}
	},
};
