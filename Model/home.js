const fs = require("fs");
const path = require("path");

const { getDb } = require("../util/database");
const Favourites = require("./favourites");
const rootDir = require("../util/pathutils");
const { ObjectId } = require("mongodb");

module.exports = class Home {
  constructor(homeName, rentPerDay, address, rating, photo, description, _id) {
    this.homeName = homeName;
    this.rentPerDay = rentPerDay;
    this.address = address;
    this.rating = rating;
    this.photo = photo;
    this.description = description;
    if (_id) {
      this._id = _id;
    }
  }

  save() {
    const db = getDb();
    const updateHome = {
      homeName: this.homeName,
      rentPerDay: this.rentPerDay,
      address: this.address,
      rating: this.rating,
      photo: this.photo,
      description: this.description,
    };
    if (this._id) {
      return db
        .collection("homes")
        .updateOne({ _id: new ObjectId(this._id) }, { $set: updateHome });
    } else {
      return db.collection("homes").insertOne(this);
    }
  }

  static fetchHomes() {
    const db = getDb();
    return db.collection("homes").find().toArray();
  }

  static findByID(homeID) {
    const db = getDb();
    return db
      .collection("homes")
      .find({ _id: new ObjectId(String(homeID)) })
      .next();
  }
  static deleteByID(homeID) {
    const db = getDb();
    return db
      .collection("homes")
      .deleteOne({ _id: new ObjectId(String(homeID)) });
  }
};
