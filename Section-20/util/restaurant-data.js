const fs = require("fs");
const path = require("path");

const restaurantsFilePath = path.join(
  __dirname,
  "..",
  "data",
  "restaurants.json"
);

function getRestaurants() {
  const fileData = fs.readFileSync(restaurantsFilePath);
  const restaurants = JSON.parse(fileData);
  return restaurants;
}

function getRestaurantById(id) {
  const restaurants = getRestaurants();

  let restaurant = restaurants.find(function (r) {
    return r.id === id;
  });

  return restaurant;
}

function saveRestaurants(restaurants) {
  fs.writeFileSync(restaurantsFilePath, JSON.stringify(restaurants));
}

module.exports = {
  getRestaurants: getRestaurants,
  getRestaurantById: getRestaurantById,
  saveRestaurants: saveRestaurants,
};
