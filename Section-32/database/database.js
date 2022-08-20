const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let database;

async function connectToDb() {
  const client = await MongoClient.connect("mongodb://localhost:27017");
  database = client.db("dev-associates");
}

function getDb() {
  if (!database) {
    throw new Error("You must connect first!"); // XD
  }
  return database;
}

module.exports = {
  connectToDb: connectToDb,
  getDb: getDb,
};
