const User = require("../models/user");
const validationSession = require("../utils/validation-session");
const validation = require("../utils/validation");

function getSignup(req, res) {
  let sessionInputData = validationSession.getSessionErrorData(req);

  res.render("signup", {
    inputData: sessionInputData,
  });
}

function getLogin(req, res) {
  let sessionInputData = validationSession.getSessionErrorData(req);

  res.render("login", {
    inputData: sessionInputData,
  });
}

async function trySignup(req, res) {
  const user = new User(req.body.email, req.body.password);
  const enteredConfirmEmail = req.body["confirm-email"];

  if (!validation.userIsValid(user) || user.email !== enteredConfirmEmail) {
    validationSession.flashErrorsToSession(
      req,
      {
        message: "Invalid input - please check your data.",
        email: user.email,
        confirmEmail: enteredConfirmEmail,
        password: user.password,
      },
      function () {
        req.session.save(function () {
          res.redirect("/signup");
        });
      }
    );
    return;
  }

  if (await user.existsAlready()) {
    validationSession.flashErrorsToSession(
      req,
      {
        message: "User exists already!",
        email: user.email,
        confirmEmail: enteredConfirmEmail,
        password: user.password,
      },
      function () {
        req.session.save(function () {
          res.redirect("/signup");
        });
      }
    );

    return;
  }

  await user.signup();

  res.redirect("/login");
}

async function tryLogin(req, res) {
  const user = new User(req.body.email, req.body.password);

  if (!(await user.existsAlready())) {
    validationSession.flashErrorsToSession(
      req,
      {
        message: "Could not log you in - please check your credentials!",
        email: user.email,
        password: user.password,
      },
      function () {
        req.session.save(function () {
          res.redirect("/login");
        });
      }
    );
    return;
  }

  const passwordsAreEqual = await user.comparePass();

  if (!passwordsAreEqual) {
    validationSession.flashErrorsToSession(
      req,
      {
        message: "Could not log you in - please check your credentials!",
        email: user.email,
        password: user.password,
      },
      function () {
        req.session.save(function () {
          res.redirect("/login");
        });
      }
    );
    return;
  }

  req.session.user = { id: await user.getId(), email: user.email };
  req.session.isAuthenticated = true;
  req.session.save(function () {
    res.redirect("/admin");
  });
}

function logout(req, res) {
  req.session.user = null;
  req.session.isAuthenticated = false;
  res.redirect("/");
}

function get401(req, res) {
  return res.status(401).render("401");
}

module.exports = {
  getLogin: getLogin,
  getSignup: getSignup,
  tryLogin: tryLogin,
  trySignup: trySignup,
  logout: logout,
  get401: get401,
};
