const User = require("../models/user-model");

const validation = require("../utils/validation");

function getSignup(req, res) {
  res.render("shared/auth/signup");
}

async function trySignup(req, res) {
  const validationResult = validation.validateSignupData(req.body);

  if (!validationResult.isValid) {
    return;
  }

  const user = new User(req.body);

  if (await user.isExistingInDb()) {
    return; // User Already Exists
  }

  await user.signup();
  res.redirect("/login");
}

function getLogin(req, res) {
  res.render("shared/auth/login");
}

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  trySignup: trySignup,
};
