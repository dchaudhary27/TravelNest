const fs = require("fs");
const path = require("path");

const rootDir = require("../util/pathutils");

module.exports = class Home {
  constructor(homeName, rentPerDay, address, rating, photo) {
    this.homeName = homeName;
    this.rentPerDay = rentPerDay;
    this.address = address;
    this.rating = rating;
    this.photo = photo;
  }

  save() {
    Home.fetchHomes((registeredHomes) => {
      console.log("Updating existing home with ID:", this.id);
      if (this.id) {
        registeredHomes = registeredHomes.map((home) =>
          home.id === this.id ? this : home
        );
      } else {
        this.id = Date.now().toString();
        registeredHomes.push(this);
      }

      const filePath = path.join(rootDir, "data", "homes.json");
      fs.writeFile(filePath, JSON.stringify(registeredHomes), (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
  }

  static fetchHomes(callback) {
    const filePath = path.join(rootDir, "data", "homes.json");
    fs.readFile(filePath, (err, fileContent) => {
      callback(err ? [] : JSON.parse(fileContent));
    });
  }

  static findByID(homeID, callback) {
    Home.fetchHomes((Homes) => {
      const homeFound = Homes.find((home) => home.id === homeID);
      callback(homeFound);
    });
  }
};
