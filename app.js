require("dotenv").config();
const express = require("express");
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const mongoose = require("mongoose");
const session = require("express-session");
const mongoDbStore = require("connect-mongodb-session")(session);
const multer = require("multer");
const path = require("path");
const rootDir = require("./util/pathutils");
const PORT = process.env.PORT;
const MONGO_URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@travelnest.rx3cffk.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

const { error404 } = require("./controller/error");
const authRouter = require("./routes/authRouter");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const store = new mongoDbStore({
  uri: MONGO_URL,
  collection: "sessions",
});

app.use(
  session({
    secret: "travelnest",
    resave: false,
    saveUninitialized: false,
    store,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/uploads", express.static(path.join(rootDir, "uploads")));
app.use("/rules", express.static(path.join(rootDir, "rules")));
app.use("/host/uploads", express.static(path.join(rootDir, "uploads")));
app.use("/homes/uploads", express.static(path.join(rootDir, "uploads")));

app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn;
  next();
});

app.use(authRouter);
app.use("/", storeRouter);
app.use("/host", (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect("/login");
  }
  next();
});

app.use("/host", hostRouter);

app.use(error404);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });
