const { render } = require("ejs");

function renderError(res, message, statusCode, title) {
  message = message
    ? message
    : "We are really sorry for the inconvenience. Please be assured we are trying our best to resolve the issue as quick as possible :)";
  statusCode = statusCode ? statusCode : 500;
  title = title ? title : "Oopsies! *^*";

  res.status(statusCode).render("shared/errors/error", {
    message: message,
    title: title,
    statusCode: statusCode,
  });
}

module.exports = renderError;
