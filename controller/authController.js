exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login to TravelNest",
  });
};

exports.postLogin = (req, res, next) => {
  res.redirect("/");
};
