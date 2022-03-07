const moment = require("moment-timezone");
const { createLogger, format, transports } = require("winston");
require("winston-daily-rotate-file");
const path = require("path");
const { combine, timestamp, label, printf } = format;
const {
  server: {
    LOG_FILE_SIZE,
    SERVER_LOGGING_LEVEL,
    LOG_FOLDER,
    INFO_LOG_FILE_NAME,
    ERROR_LOG_FILE_NAME,
  },
} = require("./index");

let logFolder = process.env.LOG_FOLDER ? process.env.LOG_FOLDER : LOG_FOLDER;
let infoLogFilePath = path.join(logFolder, INFO_LOG_FILE_NAME);
let errorLogFilePath = path.join(logFolder, ERROR_LOG_FILE_NAME);

/**
 * 0: error
 * 1: warn
 * 2: info
 * 3: verbose
 * 4: debug
 * 5: silly
 */

/* info level log file */
let infoLogFile = new transports.DailyRotateFile({
  filename: infoLogFilePath,
  maxSize: LOG_FILE_SIZE,
  maxFiles: 1,
  level: "info",
});

/* error level log file */
let errorLogFile = new transports.DailyRotateFile({
  filename: errorLogFilePath,
  maxSize: LOG_FILE_SIZE,
  maxFiles: 1,
  level: "error",
});

const formatDate = () =>
  new Date().toLocaleString("en-US", { timeZone: moment.tz.guess() });

const logger = createLogger({
  format: combine(
    label({ label: "Polytrade" }),
    timestamp({
      format: formatDate,
    }),
    printf(
      (nfo) =>
        `${nfo.timestamp} [${nfo.label}] ${nfo.level}: ${JSON.stringify(
          nfo.message
        )}`
    )
  ),
  level: SERVER_LOGGING_LEVEL,
  transports: [infoLogFile, errorLogFile],
  exitOnError: false,
});

if (process.env.ENV !== "production") {
  logger.add(
    new transports.Console({
      format: combine(
        label({ label: "Polytrade" }),
        timestamp({
          format: formatDate,
        }),
        printf(
          (nfo) =>
            `${nfo.timestamp} [${nfo.label}] ${nfo.level}: ${JSON.stringify(
              nfo.message
            )}`
        )
      ),
    })
  );
}

module.exports = logger;
