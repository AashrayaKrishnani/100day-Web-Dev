const express = require("express");

const router = express.Router();

router.get("/products", function (req, res) {
  if (!req.session.uid) {
    return res.redirect("/login");
  }
  res.render("customer/all-products");
});

module.exports = router;
