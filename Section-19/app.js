const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();
const restaurantsFilePath = path.join(__dirname, "data", "restaurants.json");

// Enabling Templating for Views .ejs files)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false })); // Middleware connection to ensure parsing of User-Input.
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("index");
});
app.get("/index", function (req, res) {
  res.render("index");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.get("/recommend", function (req, res) {
  res.render("recommend");
});

app.post("/recommend", function (req, res) {
  const restaurantData = req.body;
  const fileData = fs.readFileSync(restaurantsFilePath);

  const restaurants = JSON.parse(fileData);
  restaurants.push(restaurantData);

  fs.writeFileSync(restaurantsFilePath, JSON.stringify(restaurants));

  res.redirect("/confirm");
});

app.get("/confirm", function (req, res) {
  res.render("confirm");
});

app.get("/restaurants", function (req, res) {
  const fileData = fs.readFileSync(restaurantsFilePath);
  const restaurants = JSON.parse(fileData);

  res.render("restaurants", {
    restaurants: restaurants,
  });
});

app.listen(5500);
