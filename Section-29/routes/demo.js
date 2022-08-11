const express = require("express");

const db = require("../database/database");

const bcrypt = require("bcryptjs");
const session = require("express-session");

const router = express.Router();

router.get("/", function (req, res) {
  res.render("welcome");
});

router.get("/signup", async function (req, res) {
  let sessionInputData = {
    errorString: "",
    email: "",
    "confirm-email": "",
    password: "",
  };

  if (req.session.inputData) {
    // Copying values
    sessionInputData.email = req.session.inputData.email;
    sessionInputData.password = req.session.inputData.password;
    sessionInputData["confirm-email"] = req.session.inputData["confirm-email"];
    sessionInputData.errorString = req.session.inputData.errorString;

    // Setting req.session.inputData back to null :)
    req.session.inputData = null;
    return req.session.save(function () {
      res.render("signup", { inputData: sessionInputData });
    });
  }

  res.render("signup", { inputData: sessionInputData });
});

router.post("/signup", async function (req, res) {
  const userData = req.body;

  let errorString = "";

  // Checking for common errors
  if (userData.email != userData["confirm-email"]) {
    errorString = "Email and Confirm-Email do not match.";
  } else if (
    !userData.email.toString().includes("@") ||
    !userData.email.toString().includes(".")
  ) {
    errorString = "Invalid Email Enterred. Must contain @ and .";
  } else if (userData.password.toString().trim().length <= 6) {
    errorString = "Password too short. Must be greater than 6 characters";
  }

  const existingUser = await db
    .getDb()
    .collection("users")
    .findOne({ email: userData.email });

  if (existingUser && !errorString) {
    errorString =
      "Email already registered.\n Login with proper Password or Kindly Register with another Email Id";
  }

  if (errorString) {
    // alert(errorString);
    req.session.inputData = {
      errorString: errorString,
      email: userData.email,
      "confirm-email": userData["confirm-email"],
      password: userData.password,
    };

    return req.session.save(function () {
      res.redirect("/signup");
    });
  }

  // Saving User Info to DB!
  userData.email = userData.email.trim().toLowerCase();
  userData.password = userData.password.trim();

  const hashedPass = await bcrypt.hash(userData.password, 12);

  await db
    .getDb()
    .collection("users")
    .insertOne({ email: userData.email, password: hashedPass });

  // clearing any
  req.session.inputData = null;

  res.redirect("/login");
});

router.get("/login", async function (req, res) {
  let sessionInputData = {
    errorString: "",
    email: "",
    password: "",
  };

  if (req.session.inputData) {
    // Copying values
    sessionInputData.email = req.session.inputData.email;
    sessionInputData.password = req.session.inputData.password;
    sessionInputData.errorString = req.session.inputData.errorString;

    // Setting req.session.inputData back to null :)
    req.session.inputData = null;
    return req.session.save(function () {
      res.render("login", { inputData: sessionInputData });
    });
  }

  res.render("login", { inputData: sessionInputData });
});

router.post("/login", async function (req, res) {
  const loginData = req.body;
  let errorString = "";

  // Little HouseKeeping ;p
  loginData.email = loginData.email.trim().toLowerCase();
  loginData.password = loginData.password.trim();

  // Verifying if email exists in DB

  const existingUser = await db
    .getDb()
    .collection("users")
    .findOne({ email: loginData.email });

  if (!existingUser) {
    errorString =
      "Input Email is not registered. Kindly sign-up or recheck the email enterred :)";
  } else {
    // Validating Password.
    const isSamePass = await bcrypt.compare(
      loginData.password,
      existingUser.password
    );
    if (!isSamePass) {
      errorString = "Passwords do not match. Eat Almonds!";
    }
  }

  if (errorString) {
    req.session.inputData = {
      errorString: errorString,
      email: loginData.email,
      password: loginData.password,
    };

    return req.session.save(function () {
      res.redirect("/login");
    });
  }

  // Saving User Session :)

  req.session.user = { id: existingUser._id, email: existingUser.email };
  req.session.isAuth = true;

  req.session.save(function () {
    res.redirect("/profile");
  });
});

router.get("/admin", async function (req, res) {
  if (!req.session.isAuth) {
    return res.status(401).render("401");
  }

  // Checking if isAdmin or not.
  if (!res.locals.isAdmin) {
    return res.status(403).render("403");
  }

  res.render("admin");
});

router.get("/profile", function (req, res) {
  if (!req.session.isAuth) {
    return res.status(401).render("401");
  }

  res.render("profile");
});

router.post("/logout", function (req, res) {
  if (req.session.user) {
    req.session.user = null;
    req.session.isAuth = false;
    return req.session.save(function () {
      res.redirect("/");
    });
  } else {
    // alert("You aren't logged in! :)");
    return res.redirect("/");
  }
});

module.exports = router;
