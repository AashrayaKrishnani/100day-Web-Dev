const path = require("path");

const express = require("express");
const expressSession = require("express-session");

const MongoDBStore = require("connect-mongodb-session")(expressSession);
const expressMongoStorage = new MongoDBStore({
  uri: "mongodb://localhost:27017",
  databaseName: "auth-demo",
  collection: "sessions",
});

const db = require("./database/database");
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
    store: expressMongoStorage,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
    },
  })
);

app.use(async function (req, res, next) {
  const isAuth = req.session.isAuth;

  let isAdmin = false;
  if (isAuth) {
    const user = await db
      .getDb()
      .collection("users")
      .findOne({ _id: req.session.user.id });
    isAdmin = !user ? false : user.isAdmin;
  }

  res.locals.isAuth = isAuth;
  res.locals.isAdmin = isAdmin;

  return next();
});

app.use(demoRoutes);

app.use(function (error, req, res, next) {
  console.log(error);
  res.render("500");
});

db.connectToDatabase().then(function () {
  app.listen(3000);
});
