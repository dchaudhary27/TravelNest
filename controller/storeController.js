const Home = require("../Model/home");
const Favourites = require("../Model/favourites");
exports.getindex = (req, res, next) => {
  Home.fetchHomes((registeredHomes) =>
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "Airbnb Home",
    })
  );
};
exports.getHomeList = (req, res, next) => {
  Home.fetchHomes((registeredHomes) =>
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Home list",
    })
  );
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "Bookings",
  });
};
exports.getFavouritesList = (req, res, next) => {
  Favourites.getFavourites((favourites) => {
    Home.fetchHomes((registeredHomes) => {
      const favouriteHomes = registeredHomes.filter((home) =>
        favourites.includes(home.id)
      );
      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes,
        pageTitle: "My Favourites",
      });
    });
  });
};

exports.postAddToFavourites = (req, res, next) => {
  console.log("Adding to favourites Home ID:", req.body.homeId);
  Favourites.addToFavourites(req.body.homeId, (error) => {
    if (error) {
      console.log("Error adding to favourites:", error);
    }
    res.redirect("/favourites");
  });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("Requested Home ID:", homeId);
  Home.findByID(homeId, (home) => {
    if (!home) {
      res.redirect("/home-list");
    } else {
      res.render("store/home-details", {
        home: home,
        pageTitle: "Home Details",
      });
    }
  });
};
