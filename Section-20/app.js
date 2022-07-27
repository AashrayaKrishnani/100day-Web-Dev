const path = require("path");
const express = require("express");
const uuid = require("uuid");
const resData = require("./util/restaurant-data");

const app = express();

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
  res.redirect("/confirm");

  const restaurantData = req.body;
  restaurantData.id = uuid.v4(restaurantData);

  const restaurants = resData.getRestaurants();
  restaurants.push(restaurantData);
  resData.saveRestaurants(restaurants);
});

app.get("/confirm", function (req, res) {
  res.render("confirm");
});

app.get("/restaurants", function (req, res) {
  const restaurants = resData.getRestaurants();

  res.render("restaurants", {
    restaurants: restaurants,
  });
});

// Dynamic Routes ><

app.get("/restaurants/:id", function (req, res) {
  const id = req.params.id;

  // Searching for restaurant with given id;
  let restaurant = resData.getRestaurantById(id);

  if (restaurant == undefined) {
    res.status(404).render("error", {
      heading: "404: Page Not Found!",
      message: "No Restaurant with given ID Found. You sure about this? :o",
    });
  }

  res.render("restaurant-detail", { restaurant: restaurant });
});

app.use(function (req, res) {
  res.status(404).render("error", {
    heading: "404: Page Not Found!",
    message:
      "Apologies, but we couldn't find the page you were looking for. Please share this with us, so we may be of help. :)",
  });
});

// Special Error Middleware: MUST HAVE 4 PARAMETERS.
app.use(function (error, req, res, next) {
  console.log(error);
  res.status(500).render("error", {
    heading: "Oops! Something went Wrong..",
    message:
      "Apologies for the trouble. Server encountered an internal error - don't worry we are trying our best to fix it as soon as possible! :)",
  });
});

app.listen(5500);
