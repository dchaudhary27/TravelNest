require("dotenv").config();
const mongoDb = require("mongodb");
const MongoClient = mongoDb.MongoClient;

const MONGO_URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@travelnest.rx3cffk.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(MONGO_URL)
    .then((client) => {
      _db = client.db(process.env.MONGO_DB);
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
