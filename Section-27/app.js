const path = require("path");

const express = require("express");

const userRoutes = require("./routes/users");
const db = require("./database/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use("/public", express.static("public"));

app.use(userRoutes);

db.connectToDatabase().then(function () {
  app.listen(3000);
});
