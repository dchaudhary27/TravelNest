const { check, validationResult } = require("express-validator");
const bcrypyt = require("bcryptjs");
const User = require("../Model/user");
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
    oldInput: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      userType: "",
      terms: false,
    },
    errors: [],
  });
};

exports.postSignup = [
  check("firstName")
    .trim()
    .isLength({ min: 3 })
    .withMessage("First name must be at least 3 characters long.")
    .matches(/^[A-Za-z]+$/)
    .withMessage("First name must contain only letters."),
  check("lastName")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Last name must be at least 3 characters long.")
    .matches(/^[A-Za-z]+$/)
    .withMessage("Last name must contain only letters."),
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email address.")
    .normalizeEmail(),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long.")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter.")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter.")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number.")
    .matches(/[\W_]/)
    .withMessage("Password must contain at least one special character.")
    .trim(),
  check("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match.");
    }
    return true;
  }),
  check("userType").custom((value) => {
    if (!value) {
      throw new Error("Please select a user type.");
    }
    if (!["traveler", "host"].includes(value)) {
      throw new Error("Invalid user type selected.");
    }
    return true;
  }),
  check("terms")
    .isEmpty()
    .withMessage("You must accept the terms and conditions.")
    .custom((value, { req }) => {
      if (!value == "on") {
        throw new Error("You must accept the terms and conditions.");
      }
      return true;
    }),
  (req, res, next) => {
    const { firstName, lastName, email, password, userType, terms } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).render("auth/signup", {
        pageTitle: "Signup for TravelNest",
        isLoggedIn: false,
        errors: errors.array().map((err) => err.msg),
        oldInput: {
          firstName,
          lastName,
          email,
          password,
          userType,
          terms,
        },
      });
    }
    bcrypyt
      .hash(password, 12)
      .then((hashedPassword) => {
        const user = new User({
          firstName,
          lastName,
          email,
          password: hashedPassword,
          userType,
        });
        return user.save();
      })
      .then(() => {
        res.redirect("/login");
      })
      .catch((err) => {
        return res.status(422).render("auth/signup", {
          pageTitle: "Signup for TravelNest",
          isLoggedIn: false,
          errors: [err.message],
          oldInput: {
            firstName,
            lastName,
            email,
            password,
            userType,
            terms,
          },
        });
      });
  },
];
