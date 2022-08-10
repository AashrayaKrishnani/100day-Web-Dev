const path = require("path");

const express = require("express");
const expressSession = require("express-session");

const MongoDBStore = require("connect-mongodb-session")(expressSession);
const expressMongoStorage = new MongoDBStore({
  uri: "mongodb://localhost:27017",
  databaseName: "auth-demo",
  collection: "sessions",
});

const db = require("./data/database");
const demoRoutes = require("./routes/demo");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use(
  expressSession({
    secret: "auth-demo-project-hareKrishna",
    resave: false,
    saveUninitialized: false,
    storage: expressMongoStorage,
  })
);

app.use(demoRoutes);

app.use(function (error, req, res, next) {
  res.render("500");
});

db.connectToDatabase().then(function () {
  app.listen(3000);
});
