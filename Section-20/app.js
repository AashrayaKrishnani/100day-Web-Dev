const path = require("path");
const express = require("express");

const defaultRoutes = require("./routes/default");
const restaurantRoutes = require("./routes/restaurants");

const app = express();

// Enabling Templating for Views .ejs files)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false })); // Middleware connection to ensure parsing of User-Input.
app.use(express.static("public"));

// Merging Routes from other files.
app.use("/", defaultRoutes);
app.use("/", restaurantRoutes);

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
