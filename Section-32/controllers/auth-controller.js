const User = require("../models/user-model");

const validationUtil = require("../utils/validation");
const authUtil = require("../utils/auth");
const sessionFlashUtil = require("../utils/session-flash");

function getSignup(req, res) {
  let sessionData = sessionFlashUtil.getFlashedData(req);

  if (!sessionData) {
    sessionData = {};
  }

  res.render("shared/auth/signup", { sessionData: sessionData });
}

async function trySignup(req, res, next) {
  const validationResult = validationUtil.validateSignupData(req.body);

  if (!validationResult.result) {
    return sessionFlashUtil.flashDataToSession(
      req,
      validationResult,
      function () {
        return res.redirect("/signup");
      }
    );
  }

  const user = new User(req.body);

  let signupResult;

  try {
    signupResult = await user.trySignup();
  } catch (error) {
    return next(error);
  }

  if (!signupResult.result) {
    return sessionFlashUtil.flashDataToSession(
      req,
      { ...signupResult, ...req.body },
      function () {
        return res.redirect("/signup");
      }
    );
  }

  // Successfully Signed up!
  return res.redirect("/login");
}

function getLogin(req, res) {
  let sessionData = sessionFlashUtil.getFlashedData(req);

  if (!sessionData) {
    sessionData = {};
  }
  res.render("shared/auth/login", { sessionData: sessionData });
}

async function tryLogin(req, res, next) {
  const validationResult = validationUtil.validateLoginData(req.body);

  if (!validationResult.result) {
    return sessionFlashUtil.flashDataToSession(
      req,
      validationResult,
      function () {
        return res.redirect("/login");
      }
    );
  }

  const user = new User(req.body);

  let loginResult;

  try {
    loginResult = await user.tryLogin();
  } catch (error) {
    return next(error);
  }

  if (!loginResult.result) {
    return sessionFlashUtil.flashDataToSession(
      req,
      { ...loginResult, ...req.body },
      function () {
        return res.redirect("/login");
      }
    );
  }

  // Updating session data to reflect account login :)

  authUtil.createUserSession(req, user, function () {
    return res.redirect("/");
  });
}

async function logout(req, res, next) {
  authUtil.clearUserSession(req);
  return req.session.save(function () {
    res.redirect("/");
  });
}

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  trySignup: trySignup,
  tryLogin: tryLogin,
  logout: logout,
};
