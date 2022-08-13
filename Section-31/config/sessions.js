const session = require("express-session");
const mongodbStore = require("connect-mongodb-session");

function addSessions(app) {
  const MongoDBStore = mongodbStore(session);

  const sessionStore = new MongoDBStore({
    uri: "mongodb://localhost:27017",
    databaseName: "auth-demo",
    collection: "sessions",
  });

  app.use(
    session({
      secret: "super-secret",
      resave: false,
      saveUninitialized: false,
      store: sessionStore,
      cookie: {
        maxAge: 2 * 24 * 60 * 60 * 1000, // 2 Days
      },
    })
  );
}

module.exports = {
  addSessions: addSessions,
};
