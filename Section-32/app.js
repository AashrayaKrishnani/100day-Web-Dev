const path = require("path");

const express = require("express");

const authRoutes = require("./routes/auth-routes");
const db = require("./database/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/public", express.static("public"));

app.use(authRoutes);

db.connectToDb()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (reason) {
    console.log("Failed to connect to DB! *^*");
    console.log(reason);
  });
