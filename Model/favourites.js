const { getDb } = require("../util/database");
module.exports = class Favourites {
  constructor(homeId) {
    this.homeId = homeId;
  }
  save() {
    const db = getDb();
    return db
      .collection("favourites")
      .findOne({ homeId: this.homeId })
      .then((existingFav) => {
        if (existingFav) {
          return Promise.resolve();
        } else {
          return db.collection("favourites").insertOne(this);
        }
      });
  }
  static getFavourites() {
    const db = getDb();
    return db.collection("favourites").find().toArray();
  }
  static deleteFavouriteByID(homeId) {
    const db = getDb();
    return db.collection("favourites").deleteOne({ homeId: homeId });
  }
};
