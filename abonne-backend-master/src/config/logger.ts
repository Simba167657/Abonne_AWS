import * as winston from "winston";

export const logger = winston.createLogger({
    exitOnError: false,
    transports: [
        new winston.transports.File({
            filename: "./logs/info",
            level: "info",
        }),
        new winston.transports.Console({
            handleExceptions: true,
            level: "debug",
        }),
    ],
});

export const stream = winston.stream({
    write: (message: string) => {
        logger.info(message);
    },
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== "production") {
  logger.add (new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

