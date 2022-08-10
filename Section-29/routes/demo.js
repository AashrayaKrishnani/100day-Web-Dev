const express = require("express");

const db = require("../database/database");

const bcrypt = require("bcryptjs");

const router = express.Router();

router.get("/", function (req, res) {
  res.render("welcome");
});

router.get("/signup", async function (req, res) {
  res.render("signup");
});

router.get("/login", async function (req, res) {
  res.render("login");
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
    alert(errorString);
    res.redirect("/signup");
    return;
  }

  // Saving User Info to DB!

  userData.email = userData.email.trim().toLowerCase;
  userData.password = userData.password.trim();

  const hashedPass = bcrypt.hash(userData.password);

  await db
    .getDb()
    .collection("users")
    .insertOne({ email: userData.email, password: hashedPass });

  res.redirect("/login");
});

router.post("/login", async function (req, res) {
  const loginData = req.body;
  const errorString = "";

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
      "Input Email is not registered. Kindly sing-up or recheck the email enterred :)";
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
    alert(errorString);
    return res.redirect("/login");
  }

  // Saving User Session :)

  req.session.user = { id: existingUser._id, email: existingUser.email };
  req.session.isAuth = true;

  req.session.save(function () {
    res.redirect("/admin");
  });
});

router.get("/admin", function (req, res) {
  res.render("admin");
});

router.post("/logout", function (req, res) {});

module.exports = router;
