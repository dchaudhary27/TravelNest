const fs = require("fs");
const path = require("path");

const db = require("../util/database");
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
    if (this.id) {
      return db.execute(
        "UPDATE homes SET homeName = ? , rentPerDay = ?, address = ?, rating = ?, photo = ?, description = ? WHERE id = ?",
        [
          this.homeName,
          this.rentPerDay,
          this.address,
          this.rating,
          this.photo,
          this.description,
          this.id,
        ]
      );
    } else {
      return db.execute(
        "INSERT INTO homes (homeName, rentPerDay, address, rating, photo, description) VALUES (?, ?, ?, ?, ?, ?)",
        [
          this.homeName,
          this.rentPerDay,
          this.address,
          this.rating,
          this.photo,
          this.description,
        ]
      );
    }
  }

  static fetchHomes() {
    return db.execute("SELECT * FROM homes");
  }

  static findByID(homeID) {
    return db.execute("SELECT * FROM homes WHERE id = ?", [homeID]);
  }
  static deleteByID(homeID) {
    return db.execute("DELETE FROM homes WHERE id = ?", [homeID]);
  }
};
