const Home = require("../Model/home");
const { deleteFromCloudinary, extractPublicId } = require("../util/cloudinary");

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
    const photo =
      req.files && req.files.photo && req.files.photo.length > 0
        ? req.files.photo[0].path
        : null;
    const houseRules =
      req.files && req.files.houseRules && req.files.houseRules.length > 0
        ? req.files.houseRules[0].path
        : null;

    const photoPublicId = photo ? extractPublicId(photo) : null;
    const houseRulesPublicId = houseRules ? extractPublicId(houseRules) : null;

    if (!photo) return res.status(422).send("Image file is required.");

    const home = new Home({
      homeName,
      rentPerDay,
      address,
      rating,
      description,
      photo: {
        url: photo,
        publicId: photoPublicId,
      },
      houseRules: {
        url: houseRules,
        publicId: houseRulesPublicId,
      },
    });

    await home.save();
    res.redirect("/host/host-home-list");
  } catch (err) {
    console.error("Error adding home:", err);
    next(err);
  }
};

// Updated deleteFile function for Cloudinary
exports.deleteFile = async (fileInfo) => {
  try {
    if (!fileInfo) return;

    // If it's an object with publicId property
    if (fileInfo.publicId) {
      await deleteFromCloudinary(fileInfo.publicId);
    }
    // If it's a direct public_id string
    else if (typeof fileInfo === "string") {
      await deleteFromCloudinary(fileInfo);
    }
  } catch (err) {
    console.error("Error deleting file:", err);
  }
};

exports.postEditHome = async (req, res, next) => {
  try {
    const { id, homeName, rentPerDay, address, rating, description } = req.body;
    const home = await Home.findById(id);

    if (!home) return res.redirect("/host/host-home-list");

    // Update basic info
    home.homeName = homeName;
    home.rentPerDay = rentPerDay;
    home.address = address;
    home.rating = rating;
    home.description = description;

    // Handle photo update
    if (req.files && req.files.photo && req.files.photo.length > 0) {
      // Delete old photo from Cloudinary if exists
      if (home.photo && home.photo.publicId) {
        await exports.deleteFile(home.photo.publicId);
      }

      // Update with new photo
      const newPhotoUrl = req.files.photo[0].path;
      home.photo = {
        url: newPhotoUrl,
        publicId: extractPublicId(newPhotoUrl),
      };
    }

    // Handle houseRules update
    if (req.files && req.files.houseRules && req.files.houseRules.length > 0) {
      // Delete old houseRules from Cloudinary if exists
      if (home.houseRules && home.houseRules.publicId) {
        await exports.deleteFile(home.houseRules.publicId);
      }

      // Update with new houseRules
      const newRulesUrl = req.files.houseRules[0].path;
      home.houseRules = {
        url: newRulesUrl,
        publicId: extractPublicId(newRulesUrl),
      };
    }

    await home.save();
    res.redirect("/host/host-home-list");
  } catch (err) {
    console.error("Error editing home:", err);
    next(err);
  }
};

exports.postDeleteHome = async (req, res, next) => {
  try {
    const homeId = req.params.homeId;
    const home = await Home.findById(homeId);

    if (home) {
      // Delete photo from Cloudinary
      if (home.photo && home.photo.publicId) {
        await exports.deleteFile(home.photo.publicId);
      }

      // Delete houseRules from Cloudinary
      if (home.houseRules && home.houseRules.publicId) {
        await exports.deleteFile(home.houseRules.publicId);
      }
    }

    // Delete from database
    await Home.findByIdAndDelete(homeId);

    console.log("Home Deleted Successfully");
    res.redirect("/host/host-home-list");
  } catch (err) {
    console.error("Error deleting home:", err);
    res.redirect("/host/host-home-list");
  }
};
