exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login to TravelNest",
    isLoggedIn: false,
  });
};

exports.postLogin = (req, res, next) => {
  req.session.isLoggedIn = true;
  res.redirect("/");
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "Signup for TravelNest",
    isLoggedIn: false,
  });
};

exports.postSignup = (req, res, next) => {
  console.log("User Signed Up:", req.body);
  res.redirect("/login");
};
