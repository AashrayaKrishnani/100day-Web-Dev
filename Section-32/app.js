const path = require("path");

const express = require("express");
const expressSession = require("express-session");

const createSessionConfig = require("./config/sessions");

const authRoutes = require("./routes/auth-routes");
const baseRoutes = require("./routes/base-routes");
const productRoutes = require("./routes/products-routes");

const db = require("./database/database");

const csrfMiddleware = require("./middlewares/csrf-token");
const errorMiddleware = require("./middlewares/error-handler");
const checkAuthStatus = require("./middlewares/check-auth");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/public", express.static("public"));
app.use(express.urlencoded({ extended: false }));

const sessionConfig = createSessionConfig();
app.use(expressSession(sessionConfig));

app.use(csrfMiddleware.integrateCSRF);
app.use(csrfMiddleware.addCSRFToken);

app.use(checkAuthStatus);

app.use(baseRoutes);
app.use(authRoutes);
app.use(productRoutes);
app.use(errorMiddleware.handleError);

db.connectToDb()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (reason) {
    console.log("Failed to connect to DB! *^*");
    console.log(reason);
  });
