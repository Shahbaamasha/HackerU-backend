const fs = require("fs");
const path = require("path");
const { format } = require("date-fns");

// Bonus 2
const errorLogger = (err, req, res, next) => {
  const statusCode = err.status || 500;

  if (statusCode >= 400) {
    const currentDate = format(new Date(), "yyyy-MM-dd");
    const logDirectory = path.join(__dirname, "../logs");
    const logFileName = `${currentDate}.log`;
    const logFilePath = path.join(logDirectory, logFileName);

    if (!fs.existsSync(logDirectory)) {
      fs.mkdirSync(logDirectory);
    }

    const logMessage = `
      Date: ${new Date().toISOString()}
      Method: ${req.method}
      URL: ${req.originalUrl}
      Status: ${statusCode}
      Error Message: ${err.message || "No error message provided"}
      -----------------------------
    `;

    fs.appendFile(logFilePath, logMessage, (error) => {
      if (error) {
        console.error("Error writing to log file:", error);
      }
    });
  }
  next(err);
};

module.exports = errorLogger;
