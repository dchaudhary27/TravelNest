exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login to TravelNest",
    isLoggedIn: false,
  });
};

exports.postLogin = (req, res, next) => {
  res.cookie("isLoggedIn", true);
  res.redirect("/");
};

exports.postLogout = (req, res, next) => {
  res.clearCookie("isLoggedIn");
  res.redirect("/login");
};
