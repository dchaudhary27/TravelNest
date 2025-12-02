const fs = require("fs");
const path = require("path");
const rootDir = require("../util/pathutils");

const favouriteFilePath = path.join(rootDir, "data", "favourites.json");

module.exports = class Favourites {
  static addToFavourites(homeId, callback) {
    Favourites.getFavourites((favourites) => {
      if (favourites.includes(homeId)) {
        callback("Home already in favourites");
      } else {
        favourites.push(homeId);
        fs.writeFile(favouriteFilePath, JSON.stringify(favourites), callback);
      }
    });
  }
  static getFavourites(callback) {
    fs.readFile(favouriteFilePath, (err, data) => {
      callback(err ? [] : JSON.parse(data));
    });
  }
};
