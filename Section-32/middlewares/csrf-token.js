const csrf = require("csurf");

function addCSRFToken(req, res, next) {
  res.locals.csrfToken = req.csrfToken();
  next();
}

module.exports = { addCSRFToken: addCSRFToken, integrateCSRF: csrf() };
