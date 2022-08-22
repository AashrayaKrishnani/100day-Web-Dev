const mongoDbStore = require("connect-mongodb-session");
const expressSession = require("express-session");

function createSessionStore() {
  const MongoDBStore = mongoDbStore(expressSession);

  const store = new MongoDBStore({
    uri: "mongodb://localhost:27017",
    databaseName: "dev-associates",
    collection: "sessions",
  });

  return store;
}

function createSessionConfig() {
  return {
    secret: "jai-shree-mataji",
    resave: false,
    saveUninitialized: false,
    store: createSessionStore(),
    cookie: {
      maxAge: 30 * 24 * 3600 * 1000, // in ms :)
    },
  };
}

module.exports = createSessionConfig;
