function getSignup(req, res) {
  res.render("customer/auth/signup");
}

async function trySignup(req, res) {
  //.. to do
  res.redirect("/login");
}

function getLogin(req, res) {
  res.render("customer/auth/login");
}

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  trySignup: trySignup,
};
