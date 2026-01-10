const Home = require("../Model/home");
const Favourites = require("../Model/favourites");

exports.getindex = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "TravelNest Home",
      isLoggedIn: req.session.isLoggedIn,
      user: req.session.user,
    });
  });
};
exports.getHomeList = (req, res, next) => {
  Home.find().then((registeredHomes) =>
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Home list",
      isLoggedIn: req.session.isLoggedIn,
      user: req.session.user,
    })
  );
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "Bookings",
    isLoggedIn: req.session.isLoggedIn,
    user: req.session.user,
  });
};

exports.getFavouritesList = (req, res, next) => {
  Favourites.find()
    .populate("homeId")
    .then((favourites) => {
      const favouriteHomes = favourites.map((fav) => fav.homeId);
      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes,
        isLoggedIn: req.session.isLoggedIn,
        user: req.session.user,
        pageTitle: "My Favourites",
      });
    });
};

exports.postAddToFavourites = (req, res, next) => {
  const homeId = req.body.homeId;
  Favourites.findOne({ homeId: homeId })
    .then((existingFavourite) => {
      if (existingFavourite) {
        return console.log("Home already in Favourites!!");
      }
      const favourite = new Favourites({ homeId: homeId });
      console.log("Home added to Favourites Successfully!!");
      return favourite.save();
    })
    .then(() => {
      res.redirect("/favourites");
    })
    .catch((err) => {
      console.log("Error adding to favourites:", err);
    });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;

  Home.findById(homeId).then((home) => {
    if (!home) {
      res.redirect("/home-list");
    } else {
      res.render("store/home-details", {
        home: home,
        pageTitle: "Home Details",
        isLoggedIn: req.session.isLoggedIn,
        user: req.session.user,
      });
    }
  });
};

exports.postRemoveFromFavourites = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("Deleting from favourites Home ID:", homeId);
  Favourites.findOneAndDelete({ homeId: homeId })
    .then(() => {
      console.log("Home removed from Favourites Successfully!!", homeId);
    })
    .catch((err) => {
      console.log("Error removing from favourites:", err);
    })
    .finally(() => {
      res.redirect("/favourites");
    });
};
