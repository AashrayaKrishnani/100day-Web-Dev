const renderError = require("../utils/render-error");

function handleError(error, req, res, next) {
  console.log(error);
  return renderError(res);
}

module.exports = { handleError: handleError };
