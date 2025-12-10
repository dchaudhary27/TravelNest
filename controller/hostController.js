const Home = require("../Model/home");
exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home to traveNest",
    activeTab: "add-home",
    editMode: false,
  });
};
exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editMode = req.query.edit === "true";

  Home.findByID(homeId).then(([homes]) => {
    const home = homes[0];
    if (!home) {
      return res.redirect("/host/host-home-list");
    }
    res.render("host/edit-home", {
      home: home,
      pageTitle: "Edit Home to travelNest",
      activeTab: "host-home-list",
      editMode: editMode,
      homeId: homeId,
    });
  });
};
exports.gethosthomeList = (req, res, next) => {
  Home.fetchHomes().then(([registeredHomes]) => {
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Home List",
    });
  });
};

exports.postAddHome = (req, res, next) => {
  const { homeName, rentPerDay, address, rating, photo, description } =
    req.body;
  const home = new Home(
    homeName,
    rentPerDay,
    address,
    rating,
    photo,
    description
  );
  home.save();
  res.redirect("/host/host-home-list");
};

exports.postEditHome = (req, res, next) => {
  const { id, homeName, rentPerDay, address, rating, photo, description } =
    req.body;
  const home = new Home(
    homeName,
    rentPerDay,
    address,
    rating,
    photo,
    description,
    id
  );

  home.save();
  res.redirect("/host/host-home-list");
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.deleteByID(homeId)
    .then(() => {
      res.redirect("/host/host-home-list");
    })
    .catch((err) => {
      console.log("Error deleting home:", err);
      res.redirect("/host/host-home-list");
    });
};
