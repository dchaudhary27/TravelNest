const Home = require("../Model/home");
exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home to traveNest",
    activeTab: "add-home",
    isLoggedIn: req.isLoggedIn,
    editMode: false,
  });
};
exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editMode = req.query.edit === "true";

  Home.findById(homeId).then((home) => {
    if (!home) {
      return res.redirect("/host/host-home-list");
    }
    res.render("host/edit-home", {
      home: home,
      pageTitle: "Edit Home to travelNest",
      activeTab: "host-home-list",
      editMode: editMode,
      isLoggedIn: req.isLoggedIn,
      homeId: homeId,
    });
  });
};
exports.gethosthomeList = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      isLoggedIn: req.isLoggedIn,
      pageTitle: "Host Home List",
    });
  });
};

exports.postAddHome = (req, res, next) => {
  const { homeName, rentPerDay, address, rating, photo, description } =
    req.body;
  const home = new Home({
    homeName,
    rentPerDay,
    address,
    rating,
    photo,
    description,
  });
  home.save().then(() => {
    console.log("Home Added Successfully");
  });
  res.redirect("/host/host-home-list");
};

exports.postEditHome = (req, res, next) => {
  const { id, homeName, rentPerDay, address, rating, photo, description } =
    req.body;
  Home.findById(id)
    .then((home) => {
      home.homeName = homeName;
      home.rentPerDay = rentPerDay;
      home.address = address;
      home.rating = rating;
      home.photo = photo;
      home.description = description;

      home
        .save()
        .then(() => {
          console.log("Home Updated Successfully");
        })
        .catch((err) => {
          console.log("Error updating home:", err);
        });
      res.redirect("/host/host-home-list");
    })
    .catch((err) => {
      console.log("Error finding home for update:", err);
    });
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findByIdAndDelete(homeId)
    .then(() => {
      console.log("Home Deleted Successfully");
      res.redirect("/host/host-home-list");
    })
    .catch((err) => {
      console.log("Error deleting home:", err);
      res.redirect("/host/host-home-list");
    });
};
