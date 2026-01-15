const Home = require("../Model/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home to traveNest",
    activeTab: "add-home",
    isLoggedIn: req.session.isLoggedIn,
    user: req.session.user,
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
      isLoggedIn: req.session.isLoggedIn,
      user: req.session.user,
      homeId: homeId,
    });
  });
};
exports.gethosthomeList = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      isLoggedIn: req.session.isLoggedIn,
      user: req.session.user,
      pageTitle: "Host Home List",
    });
  });
};

exports.postAddHome = async (req, res, next) => {
  try {
    const { homeName, rentPerDay, address, rating, description } = req.body;
    const photo = req.files.photo?.[0]?.path || null;
    const houseRules = req.files.houseRules?.[0]?.path || null;

    if (!photo) return res.status(422).send("Image file is required.");

    const home = new Home({
      homeName,
      rentPerDay,
      address,
      rating,
      description,
      photo,
      houseRules,
    });

    await home.save();
    res.redirect("/host/host-home-list");
  } catch (err) {
    next(err);
  }
};

exports.postEditHome = async (req, res, next) => {
  try {
    const { id, homeName, rentPerDay, address, rating, description } = req.body;
    const home = await Home.findById(id);
    if (!home) return res.redirect("/host/host-home-list");

    home.homeName = homeName;
    home.rentPerDay = rentPerDay;
    home.address = address;
    home.rating = rating;
    home.description = description;

    if (req.files.photo) home.photo = req.files.photo[0].path;
    if (req.files.houseRules) home.houseRules = req.files.houseRules[0].path;

    await home.save();
    res.redirect("/host/host-home-list");
  } catch (err) {
    next(err);
  }
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
