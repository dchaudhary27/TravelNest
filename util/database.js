const mongoDb = require("mongodb");
const MongoClient = mongoDb.MongoClient;

const Mongo_URL =
  "mongodb+srv://dchaudhari27:travelNest27@travelnest.rx3cffk.mongodb.net/?appName=travelNest";

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(Mongo_URL)
    .then((client) => {
      _db = client.db("travelNest");
      callback();
    })
    .catch((err) => {
      console.log("Failed to connect to MongoDB", err);
    });
};

const getDb = () => {
  if (!_db) {
    throw new Error("No database found!");
  }
  return _db;
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
