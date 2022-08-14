const express = require("express");

const authController = require("../controllers/auth-controllers");

const router = express.Router();

router.get("/signup", authController.getSignup);

router.get("/login", authController.getLogin);

router.post("/signup", authController.trySignup);

router.post("/login", authController.tryLogin);

router.post("/logout", authController.logout);

router.get("/401", authController.get401);

module.exports = router;
