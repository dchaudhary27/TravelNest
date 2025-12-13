const Home = require("../Model/home");
const Favourites = require("../Model/favourites");

exports.getindex = (req, res, next) => {
  Home.fetchHomes().then((registeredHomes) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "Airbnb Home",
    });
  });
};
exports.getHomeList = (req, res, next) => {
  Home.fetchHomes().then((registeredHomes) =>
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
  Favourites.getFavourites().then((favourites) => {
    favourites = favourites.map((fav) => fav.homeId);
    Home.fetchHomes().then((registeredHomes) => {
      const favouriteHomes = registeredHomes.filter((home) =>
        favourites.includes(home._id.toString())
      );
      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes,
        pageTitle: "My Favourites",
      });
    });
  });
};

exports.postAddToFavourites = (req, res, next) => {
  const favourite = new Favourites(req.body.homeId);
  favourite
    .save()
    .then("Home added to Favourite Successfully!!")
    .catch((err) => {
      console.log("Error adding to favourites:", err);
    })
    .finally(() => {
      res.redirect("/favourites");
    });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;

  Home.findByID(homeId).then((home) => {
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

exports.postRemoveFromFavourites = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("Deleting from favourites Home ID:", homeId);
  Favourites.deleteFavouriteByID(homeId)
    .then(() => {
      console.log("Home removed from Favourites Successfully!!");
    })
    .catch((err) => {
      console.log("Error removing from favourites:", err);
    })
    .finally(() => {
      res.redirect("/favourites");
    });
};
