const mongoDb = require("mongodb");
const MongoClient = mongoDb.MongoClient;

const Mongo_URL =
  "mongodb+srv://dchaudhari27:<db_password>@travelnest.rx3cffk.mongodb.net/?appName=travelNest";

const mongoConnect = (callback) => {
  MongoClient.coonect(Mongo_URL)
    .then((client) => {
      console.log("Connected to MongoDB");
      callback(client);
    })
    .cathch((err) => {
      console.log("Failed to connect to MongoDB", err);
    });
};

module.exports = mongoConnect;
