const Home = require("../Model/home");
exports.getAddHome = (req, res, next) => {
  res.render("host/addHome", { pageTitle: "Add Home to airbnb" });
};

exports.gethosthomeList = (req, res, next) => {
  Home.fetchHomes((registeredHomes) =>
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Home List",
    })
  );
};

exports.postAddHome = (req, res, next) => {
  const { houseName, rentPerDay, address, rating, photo } = req.body;
  const home = new Home(houseName, rentPerDay, address, rating, photo);
  home.save();
  res.render("host/home-added", {
    pageTitle: "Home Added Successfully",
  });
};
