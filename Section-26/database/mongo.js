const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let db;

async function connect() {
  const client = await MongoClient.connect("mongodb://localhost:27017");
  db = client.db("blogs");
}

function getDb() {
  if (!db) {
    throw { message: "Database connection not established!" };
  } else {
    return db;
  }
}

module.exports = {
  getDb: getDb,
  connectDb: connect,
};
