function getSignup(req, res) {
  res.render("auth/signup");
}

function getLogin(req, res) {
  res.render("auth/login");
}

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
};
