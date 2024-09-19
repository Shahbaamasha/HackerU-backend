const morgan = require("morgan");
const chalk = require("chalk");

const logger = morgan((tokens, req, res) => {
  const status = tokens.status(req, res);
  const statusColor =
    status >= 500
      ? chalk.red
      : status >= 400
      ? chalk.yellow
      : status >= 300
      ? chalk.cyan
      : status >= 200
      ? chalk.green
      : chalk.white;

  return [
    chalk.blue(tokens.method(req, res)),
    chalk.white(tokens.url(req, res)),
    statusColor(status),
    chalk.magenta(tokens["response-time"](req, res) + " ms"),
    chalk.gray(tokens.date(req, res, "clf")),
  ].join(" ");
});

module.exports = logger;
