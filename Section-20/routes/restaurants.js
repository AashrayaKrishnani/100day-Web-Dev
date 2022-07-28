const express = require("express");
const uuid = require("uuid");

const resData = require("../util/restaurant-data");

const router = express.Router();

router.get("/recommend", function (req, res) {
  res.render("recommend");
});

router.post("/recommend", function (req, res) {
  res.redirect("/confirm");

  const restaurantData = req.body;
  restaurantData.id = uuid.v4(restaurantData);

  const restaurants = resData.getRestaurants();
  restaurants.push(restaurantData);
  resData.saveRestaurants(restaurants);
});

router.get("/confirm", function (req, res) {
  res.render("confirm");
});

router.get("/restaurants", function (req, res) {
  const restaurants = resData.getRestaurants();
  const order = req.query.order;
  const otherOrder = order === "desc" ? "asc" : "desc";

  if (order === "desc") {
    restaurants.sort(function (resA, resB) {
      return resA.name > resB.name ? -1 : 1;
    });
  }

  res.render("restaurants", {
    restaurants: restaurants,
    otherOrder: otherOrder,
  });
});

// Dynamic Routes ><

router.get("/restaurants/:id", function (req, res) {
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

module.exports = router;
