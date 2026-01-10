const Home = require("../Model/home");
const User = require("../Model/user");

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

exports.getFavouritesList = async (req, res, next) => {
  const userId = req.session.user._id;
  const user = await User.findById(userId).populate("favourites");
  res.render("store/favourite-list", {
    favouriteHomes: user.favourites,
    isLoggedIn: req.session.isLoggedIn,
    user: req.session.user,
    pageTitle: "My Favourites",
  });
};

exports.postAddToFavourites = async (req, res, next) => {
  const homeId = req.body.homeId;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if (!user.favourites.includes(homeId)) {
    user.favourites.push(homeId);
    await user.save();
  }
  res.redirect("/favourites");
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

exports.postRemoveFromFavourites = async (req, res, next) => {
  const homeId = req.params.homeId;
  const userId = req.session.user._id;
  const user = await User.findById(userId);

  if (user.favourites.includes(homeId)) {
    user.favourites = user.favourites.filter((fav) => fav != homeId);
    await user.save();
  }
  res.redirect("/favourites");
};
