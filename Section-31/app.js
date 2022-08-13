const path = require("path");

const express = require("express");
const sessionsConfig = require("./config/sessions");
const csrf = require("csurf");

const db = require("./data/database");
const blogRoutes = require("./routes/blog");
const authRoutes = require("./routes/auth");
const authMiddlewares = require("./middlewares/auth");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

sessionsConfig.addSessions(app);
app.use(csrf());

app.use(authMiddlewares.auth);

app.use(blogRoutes);
app.use(authRoutes);

app.use(function (error, req, res, next) {
  console.log(error);
  res.render("500");
});

db.connectToDatabase().then(function () {
  app.listen(3000);
});
