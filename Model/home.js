const fs = require("fs");
const path = require("path");

const { getDb } = require("../util/database");
const Favourites = require("./favourites");
const rootDir = require("../util/pathutils");

module.exports = class Home {
  constructor(homeName, rentPerDay, address, rating, photo, description, id) {
    this.homeName = homeName;
    this.rentPerDay = rentPerDay;
    this.address = address;
    this.rating = rating;
    this.photo = photo;
    this.description = description;
    this.id = id;
  }

  save() {
    const db = getDb();
    return db.collection("homes").insertOne(this);
  }

  static fetchHomes() {
    const db = getDb();
    return db.collection("homes").find().toArray();
  }

  static findByID(homeID) {}
  static deleteByID(homeID) {}
};
